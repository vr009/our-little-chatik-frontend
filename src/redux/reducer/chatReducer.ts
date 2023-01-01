import {Actions} from "./../actions";
import {Task} from "../types";

const initialState = {
        '123456789': {
            id: '123456789',
            name: 'Заполнить Readme.md (дефолтная демо-задача)',
            creationTime: 1671614369000,
            workPeriods: [
                {
                    start: 1671614369000,
                    end: 1671618331000
                },
                {
                    start: 1671621573000,
                    end: 1671628774000
                },
                {
                    start: 1671715474000,
                    end: 1671715478000
                },
                {
                    start: 1671719079000,
                    end: 1671729881000
                }
            ],
            isInProgress: false
        }
} as Record<string, Task>

// const initialState = {} as Record<string, Task>


export type State = typeof initialState;

export const chatReducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case 'SELECT_CHAT':
            return {
                state
            };
        default:
            return state;
    }
}

