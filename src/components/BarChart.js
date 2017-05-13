import React, { Component } from 'react'
import Chart from 'chart.js'
import numeral from 'numeral'

export default class BarChart extends Component {
  chart

  componentWillUpdate (nextProps) {
    this.chart.config.data.labels = nextProps.labels
    this.chart.config.data.datasets = this.calculateDataSet(nextProps.data)
    this.chart.update()
  }

  componentDidMount () {
    this.chart = new Chart(this.canvas, {
      type: 'bar',
      data: {
        labels: this.props.labels,
        datasets: this.calculateDataSet(this.props.data)
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                callback: value => numeral(value).format('$0a')
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let label = data.datasets[tooltipItem.datasetIndex].label || ''

              if (label) {
                label += ': '
              }
              label += numeral(tooltipItem.yLabel).format('$0a')
              return label
            }
          }
        }
      }
    })
  }

  calculateDataSet ({initialDeposit, regularDeposits, totalInterest, capitalGainsTax}) {
    return [
      {
        type: 'bar',
        data: initialDeposit,
        label: 'Initial Deposit',
        backgroundColor: 'rgba(132,5,97,0.2)',
        borderColor: 'rgba(132,5,97,1)',
        borderWidth: 1,
      },
      {
        type: 'bar',
        data: regularDeposits,
        label: 'Regular Deposits',
        backgroundColor: 'rgba(201, 79, 167, 0.2)',
        borderColor: 'rgba(201, 79, 167, 1)',
        borderWidth: 1,
      },
      {
        type: 'bar',
        data: totalInterest,
        label: 'Total Interest',
        backgroundColor: 'rgba(221, 123, 194, 0.2)',
        borderColor: 'rgba(221, 123, 194, 1)',
        borderWidth: 1,
      },
      {
        type: 'bar',
        data: capitalGainsTax,
        label: 'Tax',
        backgroundColor: 'rgba(194,200,212,0.2)',
        borderColor: 'rgba(194,200,212,1)',
        borderWidth: 1,
      }
    ]
  }

  render () {
    return (
      <canvas ref={canvas => this.canvas = canvas}/>
    )
  }
}
