import React, { Component } from 'react'
import './App.scss'
import MoneyInput from './components/MoneyInput'
import PercentInput from './components/PercentInput'
import YearInput from './components/YearInput'
import Results from './components/Results'

interface Props {

}

interface State {
  initialDeposit: number;
  regularDeposit: number;
  numberOfYears: number;
  interestRate: number;
  applyTax: boolean;
  annualIncome: number;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
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

  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-5">
            <h2>Your Strategy</h2>
            <MoneyInput
              id="initialDeposit"
              label="Initial Deposit"
              name="initialDeposit"
              inputValue={this.state.initialDeposit}
              onUpdate={this.updateInitialDeposit}
            />
            <MoneyInput
              id="regularDeposit"
              label="Regular Deposit (Per Month)"
              name="regularDeposit"
              inputValue={this.state.regularDeposit}
              onUpdate={this.updateRegularDeposit}
            />
            <YearInput
              id="numberOfYears"
              label="Number of Years (Max. 60)"
              name="numberOfYears"
              inputValue={this.state.numberOfYears}
              onUpdate={this.updateNumberOfYears}
            />
            <PercentInput
              id="interestRate"
              label="Interest Rate"
              name="interestRate"
              inputValue={this.state.interestRate}
              onUpdate={this.updateInterestRate}
            />

            <h2>Taxes</h2>
            <div className="form-group">
              <label htmlFor="applyTax">Apply Australian Capital Gains Tax</label>
              <input
                id="applyTax"
                type="checkbox"
                name="applyTax"
                checked={this.state.applyTax}
                onChange={this.toggleApplyTax}
              />
            </div>

            {this.state.applyTax && (
              <MoneyInput
                id="annualIncome"
                label="Annual Income"
                name="annualIncome"
                inputValue={this.state.annualIncome}
                onUpdate={this.updateAnnualIncome}
              />
            )}
          </div>

          <Results
            initialDeposit={this.state.initialDeposit}
            regularDeposit={this.state.regularDeposit}
            numberOfYears={this.state.numberOfYears}
            interestRate={this.state.interestRate}
            applyTax={this.state.applyTax}
            annualIncome={this.state.annualIncome}
          />
        </div>
      </div>
    )
  }

  private updateInitialDeposit = (initialDeposit: number): void => {
    this.setState({
      initialDeposit: initialDeposit
    })
  }

  private updateRegularDeposit = (regularDeposit: number): void => {
    this.setState({
      regularDeposit: regularDeposit
    })
  }

  private updateAnnualIncome = (annualIncome: number): void => {
    this.setState({
      annualIncome: annualIncome
    })
  }

  private updateInterestRate = (interestRate: number): void => {
    this.setState({
      interestRate: interestRate
    })
  }

  private updateNumberOfYears = (numberOfYears: number): void => {
    this.setState({
      numberOfYears: numberOfYears
    })
  }

  private toggleApplyTax = (): void => {
    this.setState({
      applyTax: !this.state.applyTax
    })
  }
}

export default App
