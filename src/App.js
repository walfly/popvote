import React, { PropTypes, Component } from 'react';
import DifferenceSection from './components/DifferenceSection';
import TallySection from './components/TallySection';
import TimeSinceSection from './components/TimeSinceSection';
import ComparisonsSection from './components/ComparisonsSection';
import ComparisonLegend from './components/ComparisonLegend';
import './App.css';

class App extends Component {
  static propTypes = {
    d: PropTypes.object,
    r: PropTypes.object,
    ts: PropTypes.number
  }

  render() {
    const diff = Number(this.props.d.cvotes.replace(/,/g, '')) - Number(this.props.r.cvotes.replace(/,/g, ''));
    return (
      <div className="App">
        <h1>★ 2016 POPULAR VOTE ★</h1>
        <p>In the 2016 Presidential Election,</p>
        <p><span className="red-text">{this.props.r.cvotes}</span> people voted for Donald Trump,</p>
        <p><span className="blue-text">{this.props.d.cvotes}</span> people voted for Hillary Clinton.</p>
        <DifferenceSection diff={diff}/>
        <TimeSinceSection ts={this.props.ts}/>
        <ComparisonsSection diff={diff} height={300}/>
        <ComparisonLegend repName="Trump" demName="Clinton"/>
        <TallySection d={this.props.d} r={this.props.r} width={900}/>
      </div>
    );
  }
}

export default App;
