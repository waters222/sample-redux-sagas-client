// import Login from './pages/login';
import Home from './pages/dashboard';
import Login from './pages/login';
import * as React from 'react';
import './app.css';
import { Route, Switch } from 'react-router';
import NotFound from './pages/not-found';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/dashboard" component={Home} />
                    <Route path="/" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
