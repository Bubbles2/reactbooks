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
export const startCreateBook = (recipe) => {
  return async dispatch => {
    return createBookDB(recipe).then((recipe) => {
       dispatch(createBook(recipe));
    }, err => console.log('Error ===>', err));
  };
};
//==================================================================================  
export const createBook = (recipe) => {
  return {
    type: CREATE_BOOK,
    recipe
  };
};
async function createBookDB(book) {

  let formData = new FormData();
  for (let [key, value] of Object.entries(book)) {
    if (key != 'file') formData.append(key, value);
  }

  const response = await fetch('http://localhost:3001/book/create',
  {
    method: 'post',
    body: formData,//
  }).then( res => {
    console.log("Result ==>", res);
   } , err => {
    console.log("Error ==>", err);
  });

  if (!response.ok) {
    // error
  }
  const data = await response.json()
  return data
};
//==================================================================================
// Update a recipe
//==================================================================================  

export const startUpdateBook = (recipe) => {
  return async dispatch => {
    return updateBookDB(recipe).then((recipe) => {
       dispatch(createBookDB(recipe));
    }, err => console.log('Error ===>', err));
  };
};
async function updateBookDB(recipe) {
  console.log('update recipe ===>', recipe)
  let formData = new FormData();
  for (let [key, value] of Object.entries(recipe)) {
    if (key != 'file') formData.append(key, value);
  }

  const response = await fetch('http://localhost:3001/recipe/update/'+recipe._id,
  {
    method: 'put',
    body: formData,//
  })
  
  if (!response.ok) {
    // error
  }
  const data = await response.json()
  console.log("Result update  ===>", data)
  return data
};
