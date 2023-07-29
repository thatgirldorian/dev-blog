const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.comment];
    default:
      return state;
  }
};

export default commentsReducer;
