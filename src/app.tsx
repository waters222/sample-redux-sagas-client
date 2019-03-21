// import Login from './pages/login';
import Home from './pages/home';
import Login from './pages/login';
import * as React from 'react';
import './app.css';
import { Route, Switch } from 'react-router';
import { NotFound } from './pages/not-fount';

class App extends React.Component<{}> {
    public render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact={true} path="/login" component={Login} />
                    <Route path="/dash" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
