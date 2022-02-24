const filtersState = {
    // favourites: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
    filters: []
}

export const filtersReducer = (state = filtersState, action) => {
    switch(action.type) {
        case 'ADD_FILTERS':
            return {...state, filters: [ action.payload]} 
        default:
            return state
    }
}