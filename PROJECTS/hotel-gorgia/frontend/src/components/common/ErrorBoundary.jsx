import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">💥</div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Something Went Wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something went wrong. Our team has been notified
              and we're working to fix it.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-left p-4 rounded-lg mb-6">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ArrowPathIcon className="h-5 w-5" />
                Try Again
              </button>
              <Link
                to="/"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <HomeIcon className="h-5 w-5" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
