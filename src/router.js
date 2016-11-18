import Router from 'ampersand-router';
import {get2016, getYear} from './actions';

export default Router.extend({
    initialize(options) {
        this.store = options.store;
    },
    routes: {
        '': 'show2016',
        ':year': 'show'
    },
    show2016() {
        this.store.dispatch(get2016());
    },
    show(year) {
        if (year === "2016") {
            this.show2016();
        } else {
            this.store.dispatch(getYear(year));
        }
    }
})
