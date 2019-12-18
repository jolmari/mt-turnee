import React from 'react';

import './App.css';
import logo from './metro.svg';
import { Register } from './Register';
import { RoutePlanner } from './RoutePlanner';
import Secrets from './secrets/secrets.json';
import { ISecrets } from './interfaces/ISecrets';
import RoutePlannerContext from './context/RoutePlannerContext';
import { IStop } from './interfaces/IStop';

const getSecrets = (): ISecrets => {
    return Secrets;
};

const App: React.FC = () => {
    const secrets = getSecrets();
    const saveRoute = (stops: IStop[]) => {
        console.log({ stops });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Metro Turnee</h1>
            </header>
            <Register />
            <RoutePlannerContext.Provider
                value={{
                    handleRouteSave: saveRoute,
                    secrets,
                }}
            >
                <RoutePlanner />
            </RoutePlannerContext.Provider>
        </div>
    );
};

export default App;
