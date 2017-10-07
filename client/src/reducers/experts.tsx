import * as types from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_EXPERTS:
            return action.experts
        default:
            return state
    }
}
