const EventEmitter = require('events');

class ErrorEmitter extends EventEmitter {}

const createEmitter = () => {
  const errorEmitter = new ErrorEmitter();
  errorEmitter.on('error', e => {
    console.log(e);
  });
  return errorEmitter;
};

class Entity {
  constructor() {
    this.errorEmitter = createEmitter();
  }
  runFunction(firstFunc) {
    firstFunc(this.errorEmitter);
  }
}

function EntityError(message, previousError) {
  this.message = message;
  this.name = 'UserException';
  // this.previousError = previousError;
}

const childError = errorEmitter => {
  // will throw and log
  try {
    throw new Error();
  } catch (e) {
    errorEmitter.emit('error', new EntityError('child', e));
  }
};

const parentError = errorEmitter => {
  // will not throw
  try {
    childError(errorEmitter); // will get triggered
  } catch (e) {
    errorEmitter.emit('error', new EntityError('parent', e)); // will not log
  }
};

const grandParent = errorEmitter => {
  // will throw and log
  try {
    parentError(errorEmitter); // will get triggered
    throw new Error();
  } catch (e) {
    errorEmitter.emit('error', new EntityError('grandParent', e));
  }
};

const greatGrandParent = errorEmitter => {
  // will throw and log
  try {
    grandParent(errorEmitter); // will get triggered
    throw new Error();
  } catch (e) {
    errorEmitter.emit('error', new EntityError('great grandParent', e));
  }
};

ent = new Entity();

function go() {
  ent.runFunction(greatGrandParent);
}
go();
