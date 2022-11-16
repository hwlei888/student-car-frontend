
import {createStore} from 'redux';

const initialState = {
    selectStudent: null,
}

function reducer(state = initialState, action){

    switch(action.type){
        case 'selectStudent/set':
            return{
                ...state,
                selectStudent: action.payload,
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

