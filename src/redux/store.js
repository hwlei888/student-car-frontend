
import {createStore} from 'redux';

const initialState = {
    searchCar: null,
}

function reducer(state = initialState, action){

    switch(action.type){
        case 'searchCar/select':
            return{
                ...state,
                searchCar: action.payload,
            }
        default:
            console.log('UNMATCHED ACTION:', action);
            return state;
    }

}





export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
)

