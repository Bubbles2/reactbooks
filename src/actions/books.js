export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const ADD_BOOK = 'ADD_BOOK';

export const setBooks = (books) => ({
  type: 'SET_BOOKS',
  books
});

export const startGetBooks = () => {
  return (dispatch) => {
    return getBooks().then((data) => {
      dispatch(setBooks(data));
    });
  };
};
//
async function getBooks() {

  const response = await fetch(
    `http://172.20.10.4:3001/book`);

  const responseData = await response.json();

  if (!response.ok) {
    //error
    const error = new Error(responseData.message || 'Failed to fetch!');
    throw error;
  }

  return responseData;
}
//==============================================================
// Add
//==============================================================
export const createBook = (book) => {
  return {
    type: ADD_BOOK,
    book
  };
};
export const  startCreateBook= (book) => {
  return (dispatch) => {
      return dbCreateBook(book).then((book) => {
        return dispatch(createBook(book));
      }, (err) => {
        const error = new Error('Failed to fetch!');
        throw error;   });

  };
};
async function dbCreateBook(book) {
     // test if values have changed
let updurl = 'http://172.20.10.4:3001/book/create'
  const response = await fetch(updurl,
 {
   method: 'post',
   headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(book)
  })
  if (!response.ok) {
    // error
    throw new Error('Something went wrong !');
  }
   const data = await response.json()
   // Update Store
  return data
};
//==============================================================
// Update
//==============================================================
export const updateBook = (book) => {
  return {
    type: UPDATE_BOOK,
    book
  };
};
export const startUpdateBook = (book) => {
  return (dispatch) => {
    return UpdateBookDB(book).then((data) => {
      dispatch(updateBook(data));
      return Promise.resolve('ok')
    }, (err) => {
      throw new Error('Something went wrong !  '+ err);    });
  };
};
async function UpdateBookDB(book) {
    // test if values have changed
let updurl = 'http://172.20.10.4:3001/book/update/'+book._id
  const response = await fetch(updurl,
 {
   method: 'put',
   headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(book),
  })
  if (!response.ok) {
    // error
    throw new Error('Something went wrong !');
  }
   const data = await response.json()
   // Update Store
  return data

};