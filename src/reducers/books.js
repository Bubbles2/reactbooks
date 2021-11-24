const recipeReducerDefaultState = []

export default (state = recipeReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return action.books;
            case 'UPDATE_BOOK':
                const bookIndex = state.findIndex(
                    book => book._id === action.book._id
                );
                const updatedBook = {
                    _id: action.book._id,
                    title: action.book.title,
                    author: action.book.author,
                    description: action.book.description,
                    imageUrl: action.book.imageUrl,
                }
                const updatedBooks = state
                updatedBooks[bookIndex] = updatedBook;
    
                return [
                    ...updatedBooks,
                ];
            case 'ADD_BOOK':
                return [
                    ...state,
                    action.book
                ];
        default:
            return state;
    }
};