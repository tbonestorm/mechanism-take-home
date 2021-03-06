import React from 'react';
import DefaultLayout from '../containers/DefaultLayout/DefaultLayout';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <DefaultLayout />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
