const initialState: talkStateShape = {
  participants: [],
  focus: null,
  talkRequest: false
}

function talkReducer(state = initialState, action: actionObject) {
  switch(action.type) {
    default:
      return state;
  }
}

interface talkStateShape {
  participants: participantShape[],
  focus: participantShape,
  talkRequest: boolean
}

interface actionObject {
  type: string,
  payload: any
};

interface participantShape {
  name: string,
  gender: string,
  main: string
}

export default talkReducer;