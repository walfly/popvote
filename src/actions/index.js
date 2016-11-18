import cnnApi from '../api/cnnApi';
export const GET_2016 = 'GET_2016';
export const GET_WIDTH = 'GET_WIDTH';
export const GET_SCROLL = 'GET_SCROLL';

const widthCalc = () => {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
};

export const get2016 = () => dispatch => {
    cnnApi().then(json => {
        dispatch({
            type: GET_2016,
            data: json
        })
    })
};

export const getWidth = () => {
    return {
        type: GET_WIDTH,
        data: widthCalc()
    }
};

export const getScroll = (val) => {
    return {
        type: GET_SCROLL,
        data: val
    }
}
