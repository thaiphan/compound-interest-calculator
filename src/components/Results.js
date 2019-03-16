import React, { Component } from 'react'
import BarChart from './BarChart'
import getCompoundInterest from '../helpers/compound-interest'
import getIncomeTax from '../helpers/income-tax'

export default class Results extends Component {
  render() {
    let data = {
      initialDeposit: this.getYearlyInterest().map(yearlyInterest => this.props.initialDeposit),
      regularDeposits: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.regularDeposits),
      totalInterest: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.totalInterest),
      capitalGainsTax: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.capitalGainsTax)
    }

    return (
      <div className="content pure-u-1 pure-u-md-4-5">
        <h2>Results</h2>
        <BarChart
          labels={this.getYearlyInterest().map(yearlyInterest => yearlyInterest.name)}
          data={data}
        />
      </div>
    )
  }

  getYearlyInterest () {
    let yearlyInterest = []

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

  calculateCapitalGainsTax = (capitalGains, annualIncome) => {
    let grossIncomeTax = getIncomeTax(annualIncome + capitalGains)
    let incomeTax = getIncomeTax(annualIncome)

    return grossIncomeTax - incomeTax
  }
}