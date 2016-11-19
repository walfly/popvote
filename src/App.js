import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import YearSelector from './components/YearSelector';
import {getWidth, getYears} from './actions';
import {Map} from 'immutable';
import './App.css';

class App extends Component {
  static propTypes = {
    d: PropTypes.object,
    r: PropTypes.object,
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
    if(!this.props.d){
      return <div/>;
    }
    let diff;
    let lastName;
    let winningParty;
    const demVotes = Number(this.props.d.cvotes.replace(/,/g, ''));
    const repVotes = Number(this.props.r.cvotes.replace(/,/g, ''));
    if(demVotes > repVotes) {
      diff = demVotes - repVotes;
      lastName = this.props.d.lname;
      winningParty = 'blue';
    } else {
      diff = repVotes - demVotes;
      lastName = this.props.r.lname;
      winningParty = 'red';
    }
    return (
      <div className="App">
        <div className="header">
          <h1>Who Got More Votes?</h1>
          <YearSelector onChange={(e) => this.route(e)} year={this.props.year} yearList={this.props.years}/>
        </div>
        <p>In the {this.props.year} Presidential Election,</p>
        <p><span className="red-text">{this.props.r.cvotes}</span> people voted for {`${this.props.r.fname} ${this.props.r.lname}`},</p>
        <p><span className="blue-text">{this.props.d.cvotes}</span> people voted for {`${this.props.d.fname} ${this.props.d.lname}`}.</p>
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
    d: showingData.get('data').candidates.find(item => item.party === "D"),
    r: showingData.get('data').candidates.find(item => item.party === "R"),
    ts: showingData.get('data').wfLastUpdated,
    tallies: showingData.get('tallies'),
    width: showingData.get('width')
  };
}

export default connect(mapStateToProps)(App)
