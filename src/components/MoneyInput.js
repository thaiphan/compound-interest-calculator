import React, { Component } from 'react'
import accounting from 'accounting'

export default class MoneyInput extends Component {
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
        type="text"
        name={this.props.name}
        value={!this.state.focused ? accounting.formatMoney(this.state.inputValue) : this.state.inputValue}
        onChange={this.handleFormChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    )
  }
}
