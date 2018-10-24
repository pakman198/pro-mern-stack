import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Collapse } from 'react-bootstrap';

class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if(showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    const { showing, bsStyle, onDismiss, message } = this.props;
    
    return (
      <Collapse in={showing}>
        <div style={{ position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' }}>
          <Alert
            style={{ display: 'inline-block', width: 500 }}
            bsStyle={bsStyle}
            onDismiss={onDismiss}
          >
            { message }
          </Alert>
        </div>
      </Collapse>
    );
  }
}
Toast.propTypes = {
  showing: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  bsStyle: PropTypes.string,
  message: PropTypes.any // eslint-disable-line react/forbid-prop-types
}

Toast.defaultProps = {
  bsStyle: 'success',
  message: ''
}

export default Toast;