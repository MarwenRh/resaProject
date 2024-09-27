import {GET_BIEN, GET_BIEN_FILTERED} from '../types'

const initialState = {
    hotels: [], hotelsFiltered: [], loading: true,
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_BIEN:
            return {
                ...state, hotels: action.payload, loading: false
            }
        case GET_BIEN_FILTERED:
            return {
                ...state, hotelsFiltered: action.payload, loading: false
            }
        default:
            return state
    }
}
