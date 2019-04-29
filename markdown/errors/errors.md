# A Generalized Error Pattern Proposal

## What?

The following is a proposal for how we might be able to create a consistent pattern for all possible errors across all current and future Entities.

## Why?

Currently we have a relatively inconsistent way for handling errors. This is a proposal for creating a new pattern to achieve consistency from within our code base. In addition it can be used to create more consistent HoCs or hooks for our frontend.

## How?

Entity is extended with 2 new functions:

```ts
class Entity<T extends EntityObject> {
  async errors(_,req)(newData: T,req: IViewerContext) {
    return EntError.errors(this.key,req)
  }

  async createError({message,context}, req){
    return new EntErrorCreator({ownerKey:this.key,message,context}, null, req).create();
  }
}
```

An Error Entity is created containing getter fields and a single static method for querying for errors with an ownerKey matching the key of the entity it belongs to

```ts
export interface EntErrorData {
  ownerKey: DatastoreKey;
  ownerKind: 'CometScenario' | 'SupplierProject'; // ... and so on
  message: string;
  context?: object;
}

class EntError extends Entity<EntErrorData> {
  static kind = 'Error';

  get error() {
    return this.data.error;
  }

  get context() {
    return this.data.context;
  }

  get message() {
    return this.data.message;
  }

  get ownerKey() {
    return this.data.ownerKey;
  }

  static async errors(ownerKey: DatastoreKey, req: IViewerContext) {
    return this.queryForEnts<EntErrorData, EntError>(
      this.createQuery().filter('ownerKey', '=', ownerKey),
      req
    );
  }
}
```

Entities can create errors using `this.createError()` in their catch blocks:

```ts
export default class EntCometScenario extends Entity<EntCometScenarioData> {
  static kind = 'CometScenario';

  async updateScenarioSummary(data: EntCometScenarioData, req) {
    try {
      await this.update({ ...data }, req);
    } catch (e) {
      this.createError({
        message: e.msg,
        context: 'Error updating scenario due to missing data',
      }).then(() =>
        req.log.error(
          'Error updating scenario due to missing data. The message has also been written to datastore'
        )
      );
    }
  }
}
```

The schema is extended for entities to include an error field:

```ts
// schema.ts

const entityErrorType = new GraphQLObjectType({
  name: 'Error',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    error: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    context: {
      type: GraphQLUnstructuredJSON,
    },
    ownerKey: {
      type: GraphQLString,
    },
  }),
});

const cometScenarioType = new GraphQLObjectType({
  name: 'CometScenario',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    error: {
      type: entityErrorType,
    },
    /// ...
  }),
});
```

Relay can consume errors for any entities by querying for the error field defined in the schema

```jsx
// component needing comet summary data

withFragment({
  project: graphql`
    fragment SummaryComponent_project on SupplierProject {
      id
      error {
        message
        context
      }
    }
  `,
});

// ...

const SummaryComponent = ({
  project: {
    error: { context, message },
  },
}) => (
  <SummaryComponent>
    <Error message={message} context={context} />
  </SummaryComponent>
);

const Error = ({ message, context }) =>
  message || context ? (
    <span>
      {message} {context}
    </span>
  ) : (
    <Fragment />
  );

// or alternatively using a hook, or using a HoC
```

## What else could this make possible?

- Real-time error reporting in the UI.
- Also, this could solve a problem of async/await consistency and error handling in nori-graphql.
- Paves a path forward for consistency across existing and future micro services by recommending graphql back-ends and [stitched schemas](https://www.apollographql.com/docs/graphql-tools/schema-stitching) across services (and/or [graphql modules](https://medium.com/the-guild/graphql-modules-feature-based-graphql-modules-at-scale-2d7b2b0da6da)).

_Why?_

Using this error pattern in combination with a proxy (and/or without a proxy) pub-sub model would allow us to publish all long running jobs to the service that needs it (i.e, nori-sendgrid, nori-bigquery, etc).

_How?_

It would publish these errors from inside the proxy, and then if the computation errors from within a different context, we could update the error entity and publish the result to the front end using a subscription relay.

_Example_

Context:

- imagine nori-sendgrid was rewritten with a graphql server (i.e., apollo)
- imagine there is a new service called nori-bigquery that is also written with a graphql server
- both of these services contain stitched schemas so they can interface with necessary parts from nori-graphql

1. `createProjectParcelWithGeoJson()`
2. `proxy.publishFunctionCall(createProjectParcelWithGeoJson,...args)`
3. nori-bigquery (connected with a stitched graphql schema) and nori-sendgrid (also connected with a stitched graphql schema) containing subscriptions for that function, begin their own traditional async/await flavored invocation of what they need to do when that functional call happens
4. 1. if it errors out, they update the Error entity
      1. there exists a proxy job for `Error.createError()`
      2. nori-graphql (connected with relay to nori-website) publishes the error
      3. relay has a subscription for that error and populates the UI without requiring a manual user refresh
   1. if it doesn't throw an error and is successful, it notifies relay with the data and reloads the store when it's done without requiring a manual user refresh
