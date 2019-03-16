import React, { Component } from 'react'
import numeral from 'numeral'
import BarChart from './BarChart'
import getCompoundInterest from '../helpers/compound-interest'
import getIncomeTax from '../helpers/income-tax'

interface Props {
  initialDeposit: number;
  regularDeposit: number;
  numberOfYears: number;
  interestRate: number;
  applyTax: boolean;
  annualIncome: number;
}

interface YearlyInterest {
  name: string;
  principal: number;
  regularDeposits: number;
  capitalGainsTax: number;
  totalInterest: number;
}

export default class Results extends Component<Props> {
  render() {
    const yearlyInterests = this.getYearlyInterest();

    let data = {
      initialDeposit: yearlyInterests.map(yearlyInterest => this.props.initialDeposit),
      regularDeposits: yearlyInterests.map(yearlyInterest => yearlyInterest.regularDeposits),
      totalInterest: yearlyInterests.map(yearlyInterest => yearlyInterest.totalInterest),
      capitalGainsTax: yearlyInterests.map(yearlyInterest => yearlyInterest.capitalGainsTax)
    };

    const finalYearlyInterest = yearlyInterests[yearlyInterests.length - 1];

    return (
      <div className="content pure-u-1 pure-u-md-4-5">
        <h2>Results</h2>
        <div>
          <BarChart
            labels={yearlyInterests.map(yearlyInterest => yearlyInterest.name)}
            data={data}
          />
        </div>
        <div className="quick-results">
          <div className="quick-result">
            <h3>Total Savings</h3>
            <div className="quick-result-figure">{numeral(+this.props.initialDeposit + finalYearlyInterest.totalInterest + finalYearlyInterest.regularDeposits).format('$0,0')}</div>
          </div>
          <div className="quick-result">
            <h3>Total Interest</h3>
            <div className="quick-result-figure">{numeral(finalYearlyInterest.totalInterest).format('$0,0')}</div>
          </div>
          <div className="quick-result">
            <h3>Total Deposit</h3>
            <div className="quick-result-figure">{numeral(+this.props.initialDeposit + finalYearlyInterest.regularDeposits).format('$0,0')}</div>
          </div>
        </div>
      </div>
    )
  }

  private getYearlyInterest = (): Array<YearlyInterest> => {
    let yearlyInterest: Array<YearlyInterest> = []

    let currentPrincipal = this.props.initialDeposit
    let totalInterest = 0
    let regularDeposits = 0
    for (let i = 1; i <= this.props.numberOfYears; i++) {
      regularDeposits += this.props.regularDeposit * 12

      let grossPrincipal = getCompoundInterest(currentPrincipal, this.props.regularDeposit, this.props.interestRate, 12)

      // The amount of money made this year in interest
      let capitalGains = grossPrincipal - currentPrincipal - (this.props.regularDeposit * 12)
      totalInterest += capitalGains

      // Your money after you've accrued your interest for the year
      currentPrincipal = grossPrincipal

      // How much tax the government deserves from your earnt interest
      let capitalGainsTax = 0
      if (this.props.applyTax) {
        capitalGainsTax = this.calculateCapitalGainsTax(capitalGains, +this.props.annualIncome)
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

  private calculateCapitalGainsTax = (capitalGains: number, annualIncome: number): number => {
    let grossIncomeTax = getIncomeTax(annualIncome + capitalGains)
    let incomeTax = getIncomeTax(annualIncome)

    return grossIncomeTax - incomeTax
  }
}