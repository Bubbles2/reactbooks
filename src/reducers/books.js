const recipeReducerDefaultState = [
]
export default (state = recipeReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return action.books;
        default:
            return state;
    }
};