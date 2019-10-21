import React from 'react';

import './App.css';
import logo from './metro.svg';
import { Register } from './Register';
import { RoutePlanner } from './RoutePlanner';
import { StationMap } from './StationMap';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Metro Turnee</h1>
            </header>
            <StationMap latitude="60.159443" longitude="24.8785" />
            <Register />
            <RoutePlanner />
        </div>
    );
};

export default App;
