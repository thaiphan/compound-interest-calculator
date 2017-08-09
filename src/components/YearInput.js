import React, { Component } from 'react'
import numeral from 'numeral'

export default class YearInput extends Component {
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
    this.props.onUpdate(this.state.inputValue)
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
      <input
        type={this.state.focused ? 'number' : 'text'}
        name={this.props.name}
        min="1"
        max="60"
        value={!this.state.focused ? `${this.state.inputValue} year${this.state.inputValue != 1 ? 's' : ''}` : this.state.inputValue}
        onChange={this.handleFormChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    )
  }
}
