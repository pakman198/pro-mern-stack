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

  UNSAFE_componentWillReceiveProps(newProps) {
    const { value } = this.props;
    if(newProps.value !== value) {
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
    const { value: props_val } = this.props;
    const val = focused || !valid ? value : this.displayFormat(props_val);
    const childProps = Object.assign({}, this.props);
    delete childProps.onValidityChange;

    return (
      <input
        type="text"
        {...childProps}
        value={val}
        placeholder={focused ? "yyyy-mm-dd" : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onValidityChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

DateInput.defaultProps = {
  value: {}
}

export default DateInput;