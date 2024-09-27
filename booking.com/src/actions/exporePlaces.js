import {GET_PLACES_EXPLORE, GET_PLACES_ERROR_EXPLORE} from '../types'
import axios from 'axios'
import {baseUrl} from "../constants";

export const getExporePlaces = () => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/explorePlaces`);
        dispatch({
            type: GET_PLACES_EXPLORE,
            payload: res.data
        })
    } catch (e) {
        console.log("err", e)
        dispatch({
            type: GET_PLACES_ERROR_EXPLORE,
            payload: e,
        })
    }

}