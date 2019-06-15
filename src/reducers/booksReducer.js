
export default function reducer(
  state={books:[]}, action
) {
  console.log('ACTION:', action);
  switch (action.type) {
    case 'GET_BOOKS':
      return [{}]
    default:
      return state;
  }
}