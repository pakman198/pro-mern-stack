import React from 'react';

import Toast from './Toast';

function withToast(OriginalComponent) {
  return class WithToast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToastVisible: false,
        toastMessage: '',
        toastType: 'success'
      }
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }

    showSuccess(message) {
      this.setState({
        isToastVisible: true,
        toastMessage: message,
        toastType: 'success'
      });
    }

    showError(message) {
      this.setState({
        isToastVisible: true,
        toastMessage: message,
        toastType: 'danger'
      });
    }

    dismissToast() {
      this.setState({ isToastVisible: false });
    }

    render() {
      const { isToastVisible, toastMessage, toastType } = this.state;
      return (
        <div>
          <OriginalComponent
            showError={this.showError}
            showSuccess={this.showSuccess}
            {...this.props}
          />
          <Toast
            showing={isToastVisible}
            message={toastMessage}
            variant={toastType}
            onClose={this.dismissToast}
          />
        </div>
      );
    }
  }
}

export default withToast;