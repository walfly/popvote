import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import YearSelector from './components/YearSelector';
import ElectoralVotes from './components/ElectoralVotes';
import {getWidth, getYears} from './actions';
import {Map, List} from 'immutable';
import './App.css';
import {chooseColor, chooseColorText} from "./utils/chooseColor";
import About from "./components/About";

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
    years: PropTypes.array,
    about: PropTypes.bool
  }

  componentDidMount() {
    this.props.dispatch(getWidth());
    this.props.dispatch(getYears());
    this.props.router.navigate(window.location.pathname.substring(1, window.location.pathname.length), {trigger: true});
  }

  route(selection) {
    this.props.router.navigate(selection.value, {trigger: true});
  }

  route2016() {
    this.props.router.navigate("", {trigger: true});
  }

  about() {
    this.props.router.navigate('about');
  }

  body() {
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
    const electoralWinner = candidates.find(item => item.winner);
    return (<div>
        <p>In the {this.props.year} Presidential Election,</p>
        {candidates.map((item, index) => {
          const punc = index === candidates.size - 1 ? "." : ","
          return <p key={`${item.lname}${item.fname}${this.props.year}`}><span className={chooseColorText(item.party)}>{item.cvotes}</span> people voted for <span className="cand-name">{`${item.fname} ${item.lname}`}</span>{punc}</p>
        })}
        <DifferenceSection diff={diff} lastName={lastName} winningParty={winningParty}/>
        <ElectoralVotes winner={electoralWinner} year={this.props.year}/>
        <TimeSinceSection ts={this.props.ts}/>
        <ComparisonsSection diff={diff} winningParty={winningParty}/>
        <TallySection dispatch={this.props.dispatch} tallies={this.props.tallies} width={this.props.width} />
      </div>);
  }

  render() {
    let body;
    if(this.props.about){
      body = <About/>;
    } else {
      body = this.body();
    }
    return (
      <div className="App">
        <div className="header">
          <h1 onClick={() => this.route2016()}>Who Got More Votes?</h1>
          <YearSelector onChange={(e) => this.route(e)} year={this.props.year} yearList={this.props.years}/>
          <div className="about-page" onClick={() => this.about()}>About</div>
        </div>
        {body}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {showingData, years, about} = state;
  return {
    years,
    year: showingData.get('year'),
    candidates: showingData.get('data').candidates,
    ts: showingData.get('data').wfLastUpdated,
    tallies: showingData.get('tallies'),
    width: showingData.get('width'),
    about: about.about
  };
}

export default connect(mapStateToProps)(App)
