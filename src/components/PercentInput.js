import React, { Component } from 'react'
import numeral from 'numeral'

export default class PercentInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      focused: false,
      inputValue: props.inputValue
    }
  }

  toggleInputFocus = toggleState => {
    this.setState({
      focused: toggleState
    })
  }

  onBlur = () => {
    this.toggleInputFocus(false)
    if (this.props.inputValue !== this.state.inputValue) {
      this.props.onUpdate(this.state.inputValue)
    }
  }

  onFocus = () => {
    this.toggleInputFocus(true)
  }

  handleFormChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  render () {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          step="0.01"
          type={this.state.focused ? 'number' : 'text'}
          name={this.props.name}
          min="0"
          value={!this.state.focused ? numeral(this.state.inputValue).format('0,0.00%') : this.state.inputValue}
          onChange={this.handleFormChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
      </div>
    )
  }
}
