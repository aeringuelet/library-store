import { FIND_SUB } from './types';

export const findSub = sub => {
    return {
        type: FIND_SUB,
        sub
    }
}