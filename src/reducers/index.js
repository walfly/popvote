import { combineReducers } from 'redux';
import {List, Map} from 'immutable';
import { GET_2016, GET_WIDTH, GET_SCROLL, GET_CURR_YEAR, SWITCH_YEAR, GET_YEARS } from '../actions';
import {chooseColor} from '../utils/chooseColor';

const getData = (data, color, side, width) => {
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
      const winner = state.getIn(['tallies', "winner", 'data']);
      if(winner.rowsRendered < winner.rows){
         const numToAdd = Math.min(Math.floor(scroll * winner.numPerRow), winner.rows - winner.rowsRendered);
         state = state.setIn(['tallies', 'winner', 'data'], Object.assign({}, winner, {rowsRendered: winner.rowsRendered + numToAdd}));
         for(let i = 0; i < numToAdd; i ++){
            state = state.updateIn(['tallies', 'winner', 'list', 'full'], l => l.push(`tally-item ${state.getIn(['tallies', 'winner', 'data']).color} tally-item-${Math.floor(Math.random() * 11)}`));
            state = state.updateIn(['tallies', 'second', 'list', 'full'], l => l.push(`tally-item ${state.getIn(['tallies', 'second', 'data']).color} tally-item-${Math.floor(Math.random() * 11)}`));
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

const addFname = (obj) => {
  if(obj.fname){
    return obj;
  } else {
    obj.fname = obj.party === 'D' ? "Hillary" : "Donald";
  }
  return obj;
}

const stringToNum = (str) => Number(str.replace(/,/g, ''));

const showingData = (state = Map({
   width: 0,
   scroll: 0,
   year: "2016",
   data: {candidates: []},
   tallies: Map({
      winner: Map({
         list: Map({
            full: List(),
            first: List(),
         }),
         data: {}
      }),
      second: Map({
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
         const candidates = List(action.data.candidates);
         let winner = candidates.maxBy(a => stringToNum(a.cvotes));
         const winnerIndex = candidates.indexOf(winner);
         let second = candidates.delete(winnerIndex).maxBy(a => stringToNum(a.cvotes));
         winner = addFname(winner);
         second = addFname(second);
         winner = getData(winner, chooseColor(winner.party), 'left', state.get('width'));
         second = getData(second, chooseColor(second.party), 'right', state.get('width'));
         winner.displacement = 0;
         second.displacement = (winner.rows - second.rows);
         const disp = Math.max(winner.displacement + 10, second.displacement + 10);
         winner.rowsRendered = disp; 
         second.rowsRendered = disp; 
         state = state.setIn(['tallies', 'winner', 'data'], winner);
         state = state.setIn(['tallies','second','data'], second);
         state = state.setIn(['tallies', 'winner', 'list', 'first'], createFirst(winner));
         state = state.setIn(['tallies', 'winner', 'list', 'full'], createFull(winner));
         state = state.setIn(['tallies', 'second', 'list', 'first'], createFirst(second));
         state = state.setIn(['tallies', 'second', 'list', 'full'], createFull(second));
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
