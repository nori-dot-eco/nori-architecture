function UserException(message, previousError) {
  this.message = message;
  this.name = 'UserException';
  this.previousError = previousError;
}

const childError = () => {
  throw new UserException('child');
};

const parentError = () => {
  try {
    childError();
  } catch (e) {
    throw new UserException('parent', e);
  }
};

const grandParent = () => {
  try {
    parentError();
  } catch (e) {
    throw new UserException('grandparent', e);
  }
};

const catchErrors = () => {
  try {
    grandParent();
  } catch (e) {
    console.log(e);
  }
};

catchErrors();
