import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import {getCurrYear, getWidth} from './actions';
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
    year: PropTypes.string
  }

  componentDidMount() {
    this.props.dispatch(getWidth());
    this.props.dispatch(getCurrYear());
  }

  route() {
    this.props.router.navigate('2012', {trigger: true});
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
        <h1 onClick={() => this.route() }>★ 2016 POPULAR VOTE ★</h1>
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
  const {showingData} = state;
  return {
    year: showingData.get('year'),
    d: showingData.get('data').candidates.find(item => item.party === "D"),
    r: showingData.get('data').candidates.find(item => item.party === "R"),
    ts: showingData.get('data').wfLastUpdated,
    tallies: showingData.get('tallies'),
    width: showingData.get('width')
  };
}

export default connect(mapStateToProps)(App)
