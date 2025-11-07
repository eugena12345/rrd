import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log('error: ', error);
        console.log('errorInfo: ', errorInfo);

    }

    static getDerivedStateFromError(error) {

        return { hasError: true }
    }


    render() {
        if (this.state.hasError) {
            console.log('Что-то пошло не так');
            return (<h4>Что-то пошло не так...</h4>)
        }
        return this.props.children;
    }
};

export default ErrorBoundary;