import React, { Component } from 'react'
import './App.css'
import getCompoundInterest from './helpers/compound-interest'
import getIncomeTax from './helpers/income-tax'
import BarChart from './components/BarChart'
import MoneyInput from './components/MoneyInput'
import PercentInput from './components/PercentInput'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      initialDeposit: 100,
      regularDeposit: 0,
      numberOfYears: 5,
      interestRate: 0.03,
      applyTax: true,
      annualIncome: 60000
    }
  }

  handleFormChange = event => {
    let newValue = event.target.value
    switch (event.target.name) {
      case 'numberOfYears':
        if (newValue < 0) {
          newValue = 0
        } else if (newValue > 60) {
          newValue = 60
        }
        break
      default:
        newValue = event.target.value
    }

    this.setState({
      [event.target.name]: newValue
    })
  }

  updateInitialDeposit = initialDeposit => {
    this.setState({
      initialDeposit: initialDeposit
    })
  }

  updateRegularDeposit = regularDeposit => {
    this.setState({
      regularDeposit: regularDeposit
    })
  }

  updateAnnualIncome = annualIncome => {
    this.setState({
      annualIncome: annualIncome
    })
  }

  updateInterestRate = interestRate => {
    this.setState({
      interestRate: interestRate
    })
  }

  handleToggle = event => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  getYearlyInterest () {
    let yearlyInterest = []

    let currentPrincipal = this.state.initialDeposit
    let totalInterest = 0
    let regularDeposits = 0
    for (let i = 1; i <= this.state.numberOfYears; i++) {
      regularDeposits += this.state.regularDeposit * 12

      let grossPrincipal = getCompoundInterest(currentPrincipal, this.state.regularDeposit, this.state.interestRate, 12)

      // The amount of money made this year in interest
      let capitalGains = grossPrincipal - currentPrincipal - (this.state.regularDeposit * 12)
      totalInterest += capitalGains

      // Your money after you've accrued your interest for the year
      currentPrincipal = grossPrincipal

      // How much tax the government deserves from your earnt interest
      let capitalGainsTax = 0
      if (this.state.applyTax) {
        capitalGainsTax = this.calculateCapitalGainsTax(capitalGains, +this.state.annualIncome)
      }

      // Your money after the government receives its entitled share of your money
      currentPrincipal -= capitalGainsTax

      totalInterest -= capitalGainsTax

      yearlyInterest = yearlyInterest.concat({
        name: `Year ${i}`,
        principal: Math.round(currentPrincipal),
        regularDeposits: regularDeposits,
        capitalGainsTax: Math.round(capitalGainsTax),
        totalInterest: Math.round(totalInterest)
      })
    }

    return yearlyInterest
  }

  calculateCapitalGainsTax = (capitalGains, annualIncome) => {
    let grossIncomeTax = getIncomeTax(annualIncome + capitalGains)
    let incomeTax = getIncomeTax(annualIncome)

    return grossIncomeTax - incomeTax
  }

  render () {
    let data = {
      initialDeposit: this.getYearlyInterest().map(yearlyInterest => this.state.initialDeposit),
      regularDeposits: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.regularDeposits),
      totalInterest: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.totalInterest),
      capitalGainsTax: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.capitalGainsTax)
    }

    return (
      <div className="App">
        <div className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-5">
            <h2>Your Strategy</h2>
            <div className="form-group">
              <label>Initial Deposit</label>
              <MoneyInput
                name="initialDeposit"
                inputValue={this.state.initialDeposit}
                onUpdate={this.updateInitialDeposit}
              />
            </div>
            <div className="form-group">
              <label>Regular Deposit</label>
              <MoneyInput
                name="regularDeposit"
                inputValue={this.state.regularDeposit}
                onUpdate={this.updateRegularDeposit}
              />
            </div>
            <div className="form-group">
              <label>Number of Years (Max. 60)</label>
              <input type="number" name="numberOfYears" min="0" max="60" value={this.state.numberOfYears}
                     onChange={this.handleFormChange}/>
            </div>
            <div className="form-group">
              <label>Interest Rate</label>
              <PercentInput
                name="interestRate"
                inputValue={this.state.interestRate}
                onUpdate={this.updateInterestRate}
              />
            </div>

            <h2>Taxes</h2>
            <div className="form-group">
              <label>Apply Tax</label>
              <input type="checkbox" name="applyTax" checked={this.state.applyTax}
                     onChange={this.handleToggle}/>
            </div>
            <div className="form-group">
              <label>Annual Income</label>
              <MoneyInput
                name="annualIncome"
                inputValue={this.state.annualIncome}
                onUpdate={this.updateAnnualIncome}
              />
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
    )
  }
}

export default App
