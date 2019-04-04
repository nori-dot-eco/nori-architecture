const childError = () => {
  throw new Error('child');
};

const parentError = () => {
  try {
    childError();
  } catch (e) {
    throw new Error(e);
  }
};

const grandParent = () => {
  try {
    parentError();
  } catch (e) {
    throw new Error(e);
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
