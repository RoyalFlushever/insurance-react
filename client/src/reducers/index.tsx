import {combineReducers} from 'redux'
import count from './count'
import experts from './experts'
import expert from './expert'
import contacts from './contacts'

export default combineReducers({
    experts,
    count,
    contacts,
    expert
})
