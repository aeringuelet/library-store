import { FIND_SUB } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case FIND_SUB:
            return {
                ...state,
                name: action.sub.name,
                code: action.sub.code,
                carrier: action.sub.carrier
            }
            break;
    
        default:
            return state;
            break;
    }
}