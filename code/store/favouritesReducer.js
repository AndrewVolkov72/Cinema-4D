const favouritesState = {
    // favourites: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
    favourites: []
}

export const favouritesReducer = (state = favouritesState, action) => {
    switch(action.type) {
        case 'ADD_FAVOURITES':
            return {...state, favourites: [...state.favourites, action.payload]} 
        case 'REMOVE_FAVOURITES':
            return {...state, favourites: state.favourites.filter(item=>item.id !== action.payload)} 
        default:
            return state
    }
}