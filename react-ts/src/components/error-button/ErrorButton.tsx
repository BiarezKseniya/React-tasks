import { Component } from 'react';

class ErrorButton extends Component {
  state = {
    showError: false,
  };

  render() {
    if (this.state.showError) {
      throw new Error('Test error');
    }
    return (
      <button
        className="header__get-error"
        onClick={() => {
          this.setState({ showError: true });
        }}
      >
        Get Error
      </button>
    );
  }
}

export default ErrorButton;
