import React from 'react';
import PropTypes from 'prop-types';

class DateInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.editFormat(props.value),
      focused: false,
      valid: true
    }
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.value !== this.props.value) {
      this.setState({
        value: this.editFormat(newProps.value)
      });
    }
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }
  onBlur(e) {
    const { value, valid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const val = this.unformat(value);
    const valid_val = value === '' || val !== null;

    if( valid_val !== valid && onValidityChange) {
      onValidityChange(e, valid_val)
    }

    this.setState({
      focused: false,
      valid: valid_val
    });

    if (valid_val) onChange(e, val);
  }

  onChange(e) {
    const { value } = e.target;

    if (value.match(/^[\d-]*$/)) {
      this.setState({ value });
    }
  }

  displayFormat(date) {
    if (date !== null) {
      const formatedDate = new Date(date); 
      return formatedDate.toUTCString().slice(0, -13);
    }
    return '';
  }

  editFormat(date) {
    return date !== null ? date : '';
  }

  unformat(str) {
    const val = new Date(str);

    return isNaN(val.getTime()) ? null : val;
  }

  render() {
    const { valid, focused, value } = this.state;
    const { name } = this.props;
    const className = !valid && !focused ? 'invalid' : null;
    const val = focused || !valid ? value : this.displayFormat(this.props.value);

    return (
      <input
        type="text"
        size={20}
        name={name}
        className={className}
        value={val}
        placeholder={ focused ? "yyyy-mm-dd" : null }
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange} />
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValidityChange: PropTypes.func,
  name: PropTypes.string.isRequired
}

export default DateInput;