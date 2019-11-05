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
    const { showing, variant, onClose, message } = this.props;
    const styles = {
      position: 'fixed', 
      top: 60, 
      left: 0, 
      right: 0, 
      textAlign: 'center',
      zIndex: 5
    }
    
    return (
      <Collapse in={showing}>
        <div style={styles}>
          <Alert
            style={{ display: 'inline-block', width: 500 }}
            variant={variant}
            onClose={onClose}
            dismissible
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
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string,
  message: PropTypes.any // eslint-disable-line react/forbid-prop-types
}

Toast.defaultProps = {
  variant: 'success',
  message: ''
}

export default Toast;