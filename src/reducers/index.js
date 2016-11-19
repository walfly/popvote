import { combineReducers } from 'redux';
import {List, Map} from 'immutable';
import { GET_2016, GET_WIDTH, GET_SCROLL, GET_CURR_YEAR, SWITCH_YEAR, GET_YEARS } from '../actions';

const getData = (data, color, side, width, scroll) => {
  const obj = {color, side};
  obj.svotes = data.cvotes;
  obj.width = (width/2);
  obj.votes = Number(data.cvotes.replace(/,/g, ''))/200;
  obj.fivers = Math.floor(obj.votes / 5);
  obj.remainder = Math.floor(obj.votes % 5);
  obj.numPerRow = Math.floor((obj.width - 20)/50);
  obj.rows = Math.floor(obj.fivers/obj.numPerRow);
  obj.firstRow = obj.fivers % obj.numPerRow;
  obj.rowsRendered = 150;
  obj.name = data.lname;
  return obj;
}

const appendToLists = (scroll, state) => {
   if(scroll >= 1) {
      const winner = state.getIn(['tallies', state.getIn(['tallies', 'winner']), 'data']);
      if(winner.rowsRendered < winner.rows){
         const numToAdd = Math.min(Math.floor(scroll * winner.numPerRow), winner.rows - winner.rowsRendered);
         state = state.setIn(['tallies', state.getIn(['tallies', 'winner']), 'data'], Object.assign({}, winner, {rowsRendered: winner.rowsRendered + numToAdd}));
         for(let i = 0; i < numToAdd; i ++){
            state = state.updateIn(['tallies', 'dem', 'list', 'full'], l => l.push(`tally-item blue tally-item-${Math.floor(Math.random() * 11)}`));
            state = state.updateIn(['tallies', 'rep', 'list', 'full'], l => l.push(`tally-item red tally-item-${Math.floor(Math.random() * 11)}`));
         }
         return state;
      } else {
         return state;
      }  
   } else {
      return state;
   }
};

const createFull = (data) => {
   let list = List();
   for(let i = 0; i < data.numPerRow * (data.rowsRendered - data.displacement); i++){
      list = list.push(`tally-item ${data.color} tally-item-${Math.floor(Math.random() * 11)}`);
   }
   return list;
}

const createFirst = (data) => {
   let list = List();
   for(let i = 0; i < data.firstRow; i++){
      list = list.push(`tally-item ${data.color} tally-item-${Math.floor(Math.random() * 11)}`);
   }
   if(data.remainder){
      list = list[data.side === 'left' ? 'unshift' : 'push'](`tally-item ${data.color} remainder-${data.remainder}`);
   }
   return list;
}

const showingData = (state = Map({
   width: 0,
   scroll: 0,
   year: "2016",
   data: {candidates: []},
   tallies: Map({
      winner: 'dem',
      rep: Map({
         list: Map({
            full: List(),
            first: List(),
         }),
         data: {}
      }),
      dem: Map({
         list: Map({
            full: List(),
            first: List(),
         }),
         data: {}
      })
   })
}), action) => {
   switch (action.type) {
      case GET_2016:
      case SWITCH_YEAR:
         state = state.set('year', action.key);
         let rep = action.data.candidates.find(item => item.party === 'R');
         rep.fname = rep.fname || 'Donald';
         let dem = action.data.candidates.find(item => item.party === 'D');
         dem.fname = dem.fname || 'Hillary';
         rep = getData(rep, 'red', 'left', state.get('width'), state.get('scroll'));
         dem =   getData(dem, 'blue', 'right', state.get('width'), state.get('scroll'))
         if (rep.votes > dem.votes) {
            rep.displacement = 0;
            dem.displacement = (rep.rows - dem.rows);
            state = state.setIn(['tallies', 'winner'], 'rep');
         } else {
            dem.displacement = 0;
            rep.displacement = (dem.rows - rep.rows);
            state = state.setIn(['tallies', 'winner'], 'dem');
         }
         const disp = Math.max(dem.displacement + 10, rep.displacement + 10);
         dem.rowsRendered = disp; 
         rep.rowsRendered = disp; 
         state = state.setIn(['tallies', 'rep', 'data'], rep);
         state = state.setIn(['tallies','dem','data'], dem);
         state = state.setIn(['tallies', 'rep', 'list', 'first'], createFirst(rep));
         state = state.setIn(['tallies', 'rep', 'list', 'full'], createFull(rep));
         state = state.setIn(['tallies', 'dem', 'list', 'first'], createFirst(dem));
         state = state.setIn(['tallies', 'dem', 'list', 'full'], createFull(dem));
         return state.set('data', action.data);
      case GET_SCROLL:
        state = appendToLists(Math.max((action.data - state.get('scroll'))/40, 0), state);
        return state.set('scroll', action.data);
      case GET_WIDTH:
         return state.set('width', Math.min((action.data - 60), 1100));
      case GET_CURR_YEAR:
      default:
         return state;
   }
};

const years = (state = [], action) => {
   switch(action.type){
      case GET_YEARS:
         action.data.push({name: '2016', value: '2016'});
         return action.data.reverse();
      default:
         return state;
   }
}

const rootReducer = combineReducers({
  showingData,
  years
});

export default rootReducer;
