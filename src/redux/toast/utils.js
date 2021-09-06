import { setToast } from './actions';

export const dispatchErrors = (errors, dispatch) => {
  for (let i = 0; i < Object.keys(errors).length; i += 1) {
    const errorName = Object.keys(errors)[i];
    const errorList = errors[errorName];
    if (errorName === 'detail') {
      dispatch(setToast(`${errorName}: ${errorList}`, 'danger', dispatch));
      return;
    }
    for (let j = 0; j < errorList.length; j += 1) {
      dispatch(setToast(`${errorName}: ${errorList[j]}`, 'danger', dispatch));
    }
  }
};
