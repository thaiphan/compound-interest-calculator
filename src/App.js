import React, { Component } from 'react';
import './App.css';
import getCompoundInterest from './helpers/compound-interest';
import getIncomeTax from './helpers/income-tax';
import BarChart from './components/BarChart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDeposit: 100,
      regularDeposit: 0,
      numberOfYears: 5,
      interestRate: 0.03,
      applyTax: true,
      annualIncome: 60000
    };
  }

  handleFormChange(event) {
    let newValue = event.target.value;
    switch (event.target.name) {
      case 'numberOfYears':
        if (newValue < 0) {
          newValue = 0;
        } else if (newValue > 60) {
          newValue = 60;
        }
        break;
      default:
        newValue = event.target.value;
    }

    this.setState({
      [event.target.name]: newValue
    });
  }

  handleToggle(event) {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  }

  getYearlyInterest() {
    let yearlyInterest = [];

    let currentPrincipal = this.state.initialDeposit;
    let totalInterest = 0;
    let regularDeposits = 0;
    for (let i = 1; i <= this.state.numberOfYears; i++) {
      regularDeposits += this.state.regularDeposit * 12;

      let grossPrincipal = getCompoundInterest(currentPrincipal, this.state.regularDeposit, this.state.interestRate, 12);

      // The amount of money made this year in interest
      let capitalGains = grossPrincipal - currentPrincipal - (this.state.regularDeposit * 12);
      totalInterest += capitalGains;

      // Your money after you've accrued your interest for the year
      currentPrincipal = grossPrincipal;

      // How much tax the government deserves from your earnt interest
      let capitalGainsTax = 0;
      if (this.state.applyTax) {
        let grossIncomeTax = getIncomeTax(+this.state.annualIncome + capitalGains);
        let incomeTax = getIncomeTax(+this.state.annualIncome);

        capitalGainsTax = grossIncomeTax - incomeTax;
      }

      // Your money after the government receives its entitled share of your money
      currentPrincipal -= capitalGainsTax;

      totalInterest -= capitalGainsTax;

      yearlyInterest = yearlyInterest.concat({
        name: `Year ${i}`,
        principal: Math.round(currentPrincipal),
        regularDeposits: regularDeposits,
        capitalGainsTax: Math.round(capitalGainsTax),
        totalInterest: Math.round(totalInterest)
      });
    }

    return yearlyInterest;
  }

  render() {
    let data = {
      initialDeposit: this.getYearlyInterest().map(yearlyInterest => this.state.initialDeposit),
      regularDeposits: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.regularDeposits),
      totalInterest: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.totalInterest),
      capitalGainsTax: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.capitalGainsTax)
    };

    return (
      <div className="App">
        <div className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-5">
            <h2>Your Strategy</h2>
            <div className="form-group">
              <label>Initial Deposit</label>
              <input type="text" name="initialDeposit" value={this.state.initialDeposit} onChange={this.handleFormChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>Regular Deposit</label>
              <input type="text" name="regularDeposit" value={this.state.regularDeposit} onChange={this.handleFormChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>Deposit Frequency</label>
              <select>
                <option value="annually">Annually</option>
                <option value="monthly">Monthly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Years (Max. 60)</label>
              <input type="number" name="numberOfYears" min="0" max="60" value={this.state.numberOfYears} onChange={this.handleFormChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>Interest Rate</label>
              <input type="text" name="interestRate" value={this.state.interestRate} onChange={this.handleFormChange.bind(this)} />
            </div>

            <h2>Taxes</h2>
            <div className="form-group">
              <label>Apply Tax</label>
              <input type="checkbox" name="applyTax" checked={this.state.applyTax} onChange={this.handleToggle.bind(this)} />
            </div>
            <div className="form-group">
              <label>Annual Income</label>
              <input type="text" name="annualIncome" value={this.state.annualIncome} onChange={this.handleFormChange.bind(this)} />
            </div>
          </div>
          <div className="content pure-u-1 pure-u-md-4-5">
            <h2>Results</h2>
            <BarChart
              labels={this.getYearlyInterest().map(yearlyInterest => yearlyInterest.name)}
              data={data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
