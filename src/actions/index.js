import cnnApi from '../api/cnnApi';
export const GET_2016 = 'GET_2016';
export const GET_WIDTH = 'GET_WIDTH';
export const GET_SCROLL = 'GET_SCROLL';
export const SCROLL_BUTTON = 'SCROLL_BUTTON';
let buttonPressed = false;

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

export const scrollButtonOn = () => {
    buttonPressed = true;
}

export const scrollButtonOff = () => {
    buttonPressed = false;
}

export const bindScroll = (store) => {
    document.addEventListener('scroll', (e) => {
        if(!buttonPressed){
            store.dispatch(getScroll(e.target.body.scrollTop));
        }
    }, true);
}
