import cnnApi from '../api/cnnApi';
import {yearData} from '../api/yearData';
import throttle from 'lodash.throttle';

export const GET_2016 = 'GET_2016';
export const GET_CURR_YEAR = 'GET_CURR_YEAR';
export const GET_WIDTH = 'GET_WIDTH';
export const GET_SCROLL = 'GET_SCROLL';
export const SCROLL_BUTTON = 'SCROLL_BUTTON';
export const SWITCH_YEAR = 'SWITCH_YEAR';
export const GET_YEARS = 'GET_YEARS';
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
            data: json,
            key: "2016"
        })
    })
};

export const getYear = (year) => {
    return {
        type: SWITCH_YEAR,
        data: yearData[year],
        key: year
    }
};

export const getCurrYear = () => {
    return {
        type: GET_CURR_YEAR
    }
}

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

export const getYears = () => {
    return {
        type: GET_YEARS,
        data: Object.keys(yearData).map(item => { return {name: item, value: item};})
    }
}

export const scrollButtonOn = () => {
    buttonPressed = true;
}

export const scrollButtonOff = () => {
    buttonPressed = false;
}

export const bindScroll = (store) => {
    document.addEventListener('scroll', throttle((e) => {
        if(e.target.className && e.target.className.includes('select-dropdown')){
            return;
        }
        if(!buttonPressed){
            store.dispatch(getScroll(e.target.body.scrollTop));
        }
    }, 400), true);
}
