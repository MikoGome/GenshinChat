
const initialState = {
  
};

interface actionObject {
  type: string,
  payload: any
}

function accountReducer(state = initialState, action:actionObject) {
  switch(action.type) {

    default:
      return state;
  }
};

export default accountReducer;