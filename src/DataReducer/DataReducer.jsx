export const DataReducer = (state,action)=>{
    switch(action.type){
        case "products":
            return {...state, products: action.payload};
    }
}

export const initialState = {
    products: [],
}