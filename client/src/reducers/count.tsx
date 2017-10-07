import * as types from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EXPERT_COUNT:
            return action.count
        default:
            return state
    }
}
