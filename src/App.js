import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import YearSelector from './components/YearSelector';
import {getWidth, getYears} from './actions';
import {Map, List} from 'immutable';
import './App.css';
import {chooseColor, chooseColorText} from "./utils/chooseColor"

const stringToNum = (str) => Number(str.replace(/,/g, ''));


class App extends Component {
  static propTypes = {
    candidates: PropTypes.array,
    ts: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    router: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    tallies: PropTypes.instanceOf(Map),
    width: PropTypes.number,
    year: PropTypes.string,
    years: PropTypes.array
  }

  componentDidMount() {
    this.props.dispatch(getWidth());
    this.props.dispatch(getYears());
    this.props.router.navigate(this.props.year, {trigger: true});
  }

  route(selection) {
    this.props.router.navigate(selection.value, {trigger: true});
  }


  render() {
    if(!this.props.candidates.length){
      return <div/>;
    }
    const candidates = List(this.props.candidates).sort((a,b) => stringToNum(a.cvotes) < stringToNum(b.cvotes))
    const winner = candidates.maxBy(a => stringToNum(a.cvotes));
    const winnerIndex = candidates.indexOf(winner);
    const second = candidates.delete(winnerIndex).maxBy(a => stringToNum(a.cvotes));
    const diff =  stringToNum(winner.cvotes) - stringToNum(second.cvotes);
    const lastName = winner.lname;
    const winningParty = chooseColor(winner.party);
    return (
      <div className="App">
        <div className="header">
          <h1>Who Got More Votes?</h1>
          <YearSelector onChange={(e) => this.route(e)} year={this.props.year} yearList={this.props.years}/>
        </div>
        <p>In the {this.props.year} Presidential Election,</p>
        {candidates.map((item, index) => {
          const punc = index === candidates.size - 1 ? "." : ","
          return <p key={item.fname}><span className={chooseColorText(item.party)}>{item.cvotes}</span> people voted for <span className="cand-name">{`${item.fname} ${item.lname}`}</span>{punc}</p>
        })}
        <DifferenceSection diff={diff} lastName={lastName} winningParty={winningParty}/>
        <TimeSinceSection ts={this.props.ts}/>
        <ComparisonsSection diff={diff} winningParty={winningParty}/>
        <TallySection dispatch={this.props.dispatch} tallies={this.props.tallies} width={this.props.width} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {showingData, years} = state;
  return {
    years,
    year: showingData.get('year'),
    candidates: showingData.get('data').candidates,
    ts: showingData.get('data').wfLastUpdated,
    tallies: showingData.get('tallies'),
    width: showingData.get('width')
  };
}

export default connect(mapStateToProps)(App)
