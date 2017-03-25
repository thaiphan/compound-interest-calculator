import React, { Component } from 'react';
import './App.css';
import getCompoundInterest from './helpers/compound-interest';
import getIncomeTax from './helpers/income-tax';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDeposit: 100,
      regularDeposit: 0,
      numberOfYears: 5,
      interestRate: 0.06
    };
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getYearlyInterest() {
    let yearlyInterest = [];

    let annualIncome = 80000;
    let applyTax = true;

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
      let capitalGainsTax = applyTax ? getIncomeTax(annualIncome + capitalGains) - getIncomeTax(annualIncome) : 0;

      // Your money after the government receives its entitled share of your money
      currentPrincipal -= capitalGainsTax;

      yearlyInterest = yearlyInterest.concat({
        name: i,
        principal: Math.round(currentPrincipal),
        regularDeposits: regularDeposits,
        capitalGainsTax: Math.round(capitalGainsTax),
        totalInterest: Math.round(totalInterest)
      });
    }

    return yearlyInterest;
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <div className="form-group">
            <label>Initial Deposit</label>
            <input type="text" name="initialDeposit" value={this.state.initialDeposit} onChange={this.handleFormChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Regular Deposit</label>
            <input type="text" name="regularDeposit" value={this.state.regularDeposit} onChange={this.handleFormChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Number of Years</label>
            <input type="text" name="numberOfYears" value={this.state.numberOfYears} onChange={this.handleFormChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Interest Rate</label>
            <input type="text" name="interestRate" value={this.state.interestRate} onChange={this.handleFormChange.bind(this)} />
          </div>
        </div>
        <div className="main">
          <table>
            <thead>
              <tr><th />{this.getYearlyInterest().map((yearlyInterest, index) => <th key={index}>{yearlyInterest.name}</th>)}</tr>
            </thead>
            <tbody>
              <tr><td>Initial Deposit</td>{this.getYearlyInterest().map((yearlyInterest, index) => <td key={index}>{this.state.initialDeposit}</td>)}</tr>
              <tr><td>Regular Deposits</td>{this.getYearlyInterest().map((yearlyInterest, index) => <td key={index}>{yearlyInterest.regularDeposits}</td>)}</tr>
              <tr><td>Total Interest</td>{this.getYearlyInterest().map((yearlyInterest, index) => <td key={index}>{yearlyInterest.totalInterest}</td>)}</tr>
              <tr><td>Capital Gains Tax</td>{this.getYearlyInterest().map((yearlyInterest, index) => <td key={index}>{yearlyInterest.capitalGainsTax}</td>)}</tr>
              <tr><td>Total Savings</td>{this.getYearlyInterest().map((yearlyInterest, index) => <td key={index}>{yearlyInterest.principal}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
