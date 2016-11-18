import Router from 'ampersand-router';
import {get2016} from './actions';

export default Router.extend({
    initialize(options) {
        this.dispatch = options.store;
    },
    routes: {
        '': 'show2016',
        ':year': 'show'
    },
    show2016() {
        debugger;
        this.dispatch(get2016);
    },
    show(year) {
        if (year === "2016") {
            this.show2016();
        }
    }
})
