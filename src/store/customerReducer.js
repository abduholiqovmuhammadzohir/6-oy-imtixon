const defaultState = {
    customers:[]
}

export const customerReducer = (state = defaultState, actions) => {

    switch (actions.type) {
        case "ADD":
            return{...state, customers: [...state.customers , actions.payload]}
    
        default:
            return state
    }
}