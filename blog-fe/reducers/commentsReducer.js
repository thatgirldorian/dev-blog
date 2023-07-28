// commentsReducer.js

export default (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.comment];

    case 'SET_COMMENTS':
      return action.payload;

    default:
      return state;
  }
};
