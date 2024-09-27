import {GET_BIEN, GET_BIEN_ERROR} from '../types'
import axios from 'axios'
import {baseUrl} from "../constants";

export const getHotels = (location) => async dispatch => {
    try {
        let url = baseUrl + "/biens";
        let dispatchActionType = GET_BIEN
        if (location) {
            url = url + `?city=${location}`
        }
        const res = await axios.get(url);
        dispatch({
            type: dispatchActionType, payload: res.data
        })
    } catch (e) {
        console.log("err", e)
        dispatch({
            type: GET_BIEN_ERROR, payload: e,
        })
    }

}
