
export function addBooks(book) {
  return {
    type: 'ADD_BOOKS',
    payload: book
  }
}

export function getBooks(firebase, key) {
  return firebase;
  /*
  return function() {
    
  }
  */
}

export function nextBooks(key) {
  return {
    type: 'NEXT_BOOKS',
    payload: {
      key
    }
  }
}

export function prevBooks(key) {
  return {
    type: 'PREV_BOOKS',
    payload: {
      key
    }
  }
}
