import Login from './pages/login';
import Home from './pages/home';
import * as React from 'react';
import './app.css';
import { ApplicationState } from './stores';
import { connect } from 'react-redux';
import { isLogin } from './stores/account/selectors';

interface Props {
    readonly bIsLogin: boolean;
}

class App extends React.Component<Props> {
    public render() {
        return (
            <div className="App">
                {this.props.bIsLogin ? <Home /> : <Login />}
            </div>
        );
    }
}

const mapStateToProps = ({ account }: ApplicationState) => ({
    bIsLogin: isLogin(account),
});

export default connect(mapStateToProps)(App);