import axios from 'axios/index';
import API_ERRORS from './apiErrorMessages';
// import { api } from '../../assets/js/constants/constants';
const api = 'localhost:8000/';

export default class API {
    static get(endpoint, ID = 0, queries = '') {
        const param = {
            id: `${ID ? `${ID}/` : ''}`,
            queries: `${queries ? `?${queries}` : ''}`,
        };

        return axios({
            method: 'GET',
            url: `${api}${endpoint}${param.id}${param.queries}`,
        });
    }

    static post(endpoint, data) {
        return axios({
            method: 'POST',
            url: `${api}${endpoint}`,
            data,
        });
    }

    static put(endpoint, data = null) {
        return axios({
            method: 'PUT',
            url: `${api}${endpoint}`,
            data,
        });
    }

    static delete(endpoint, data = null) {
        return axios({
            method: 'DELETE',
            url: `${api}${endpoint}`,
            data,
        });
    }

    static getErrorType(xhr) {
        if (xhr.statusText === 'timeout') { // 408: client-side, 504: server-side
            return API_ERRORS.clientTimeout;
        }

        switch (xhr.status) {
        case 400:
            return API_ERRORS.invalid;

        case 401:
            return API_ERRORS.unauthorized;

        case 408:
            return API_ERRORS.clientTimeout;

        case 500:
            return API_ERRORS.internalServerError;

        case 503:
            return API_ERRORS.serviceUnavailable;

        case 504:
            return API_ERRORS.serverTimeout;

        default:
            return API_ERRORS.unknown;
        }
    }
}
