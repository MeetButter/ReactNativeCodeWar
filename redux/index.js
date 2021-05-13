/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
export const initialState ={
     heart: [],
     heartElements: []
 }
const likeReducer = (state=initialState, action)=>{

switch (action.type) {
    case "ADD_HEARTS":
        return {
            ...state,
            heart:[...state.heart, action.id],
        }
    case "ADD_ELEMENTS":
        return{
            ...state, 
            heartElements: [action.element]
        }
    default:
        return state
 
}
}

export const rootReducer = combineReducers({
likeReducer:likeReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))