import React, { useEffect, useState } from 'react';
import './TesteCelula.css';
import config from './config.json';

const TesteCelula = () => {
    const [settings, setSettings] = useState(config.atributos);

    useEffect(() => {
    
    }, [settings]);

    return (
        <div className="testecelula" style={{ backgroundColor: settings.background_color.default }}>
            <p>{settings.text.default}</p>
        </div>
    );
};

export default TesteCelula;