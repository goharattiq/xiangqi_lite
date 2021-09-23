import { setToast } from './actions';

export const dispatchErrors = (errors, dispatch) => {
  if (!errors) return;
  Object.entries(errors).forEach(([errorName, errorList]) => {
    if (errorName === 'detail') {
      dispatch(setToast(`${errorName}: ${errorList}`, 'danger', dispatch));
      return;
    }
    errorList.forEach((error) => {
      dispatch(setToast(`${error}`, 'danger', dispatch));
    });
  });
};
