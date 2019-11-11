import React from 'react';

import './App.css';
import logo from './metro.svg';
import { Register } from './Register';
import { RoutePlanner } from './RoutePlanner';
import Secrets from './secrets/secrets.json';
import { ISecrets } from './interfaces/ISecrets';

const getSecrets = (): ISecrets => {
    return Secrets;
};

const App: React.FC = () => {
    const secrets = getSecrets();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Metro Turnee</h1>
            </header>
            <Register />
            <RoutePlanner secrets={secrets} />
        </div>
    );
};

export default App;
