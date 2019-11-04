import React from 'react';
import PropTypes from 'prop-types';

class NumInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.format(props.value)
    }
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      value: this.format(newProps.value)
    })
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, this.unformat(value));
  }

  onChange(e) {
    const { value } = e.target;

    if(value.match(/^\d*$/)) {
      this.setState({ value });
    }
  }

  format(num) {
    return num !== null && num !== undefined ? num.toString() : '';
  }

  unformat(num) {
    const val = parseInt(num, 10);

    return isNaN(val) ? null : val;
  }

  render() {
    const { value } = this.state;
    return (
      <input 
        type="text"
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange} 
      />
    );
  }
}

NumInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default NumInput;