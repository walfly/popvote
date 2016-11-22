import Router from 'ampersand-router';
import {get2016, getYear, about} from './actions';
import {yearData} from './api/yearData';
import includes from 'lodash.includes';

const years = Object.keys(yearData);

export default Router.extend({
    initialize(options) {
        this.store = options.store;
    },
    routes: {
        '': 'show2016',
        'about': 'showAbout',
        ':year': 'show'
    },
    show2016() {
        this.store.dispatch(get2016());
    },
    showAbout() {
        this.store.dispatch(about());
    },
    show(year) {
        if (year === "2016") {
            this.show2016();
        } else if (!includes(years, year)) {
            this.navigate('');
        } else {
            this.store.dispatch(getYear(year));
        }
    }
})
