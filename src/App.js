import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import {get2016, getWidth} from './actions';
import {Map} from 'immutable';
import './App.css';

class App extends Component {
  static propTypes = {
    d: PropTypes.object,
    r: PropTypes.object,
    ts: PropTypes.number,
    router: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    tallies: PropTypes.instanceOf(Map),
    width: PropTypes.number
  }

  componentDidMount() {
    this.props.dispatch(getWidth());
    this.props.dispatch(get2016());
  }

  render() {
    if(!this.props.d){
      return <div/>;
    }
    const diff = Number(this.props.d.cvotes.replace(/,/g, '')) - Number(this.props.r.cvotes.replace(/,/g, ''));
    return (
      <div className="App">
        <h1>★ 2016 POPULAR VOTE ★</h1>
        <p>In the 2016 Presidential Election,</p>
        <p><span className="red-text">{this.props.r.cvotes}</span> people voted for Donald Trump,</p>
        <p><span className="blue-text">{this.props.d.cvotes}</span> people voted for Hillary Clinton.</p>
        <DifferenceSection diff={diff}/>
        <TimeSinceSection ts={this.props.ts}/>
        <ComparisonsSection diff={diff} height={150}/>
        <TallySection dispatch={this.props.dispatch} tallies={this.props.tallies} width={this.props.width} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {showingData} = state;
  return {
    d: showingData.get('data').candidates.find(item => item.party === "D"),
    r: showingData.get('data').candidates.find(item => item.party === "R"),
    ts: showingData.get('data').wfLastUpdated,
    tallies: showingData.get('tallies'),
    width: showingData.get('width')
  };
}

export default connect(mapStateToProps)(App)
