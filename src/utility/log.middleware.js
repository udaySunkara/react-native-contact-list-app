export const logAction = (store) => (next) => (action) =>  {
    // console.log('****** Current action: ', action);
    next(action);
    // console.log('****** Current state: ', store.getState());
}