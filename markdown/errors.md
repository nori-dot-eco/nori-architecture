```ts
class Entity<T extends EntityObject> {
  async errors(_,req)(newData: T,req: IViewerContext) {
    return EntError.errors(this.id,req)
  }

  async createError({message,context}, req){
    return new EntErrorCreator({ownerKey:this.key,message,context}, null, req).create();
  }
}
```

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
  project:{ error:{ context, message } }
}) =>(
  <SummaryComponent>
    <Error message={message} context={context} />
  </SummaryComponent>
)

const Error = ({message,context}) => message || context ? <span>{message} {context}</message> : <Fragment/>

// or alternatively using a hook, or using a HoC

```

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
}
```
