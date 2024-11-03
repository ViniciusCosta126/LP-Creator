import React, { useEffect, useState } from 'react';
import './NovoComponente.css';
import config from './config.json';

const NovoComponente = () => {
    const [settings, setSettings] = useState(config.settings);

    useEffect(() => {
        console.log('Configurações do bloco:', settings);
    }, [settings]);

    return (
        <div className="block-novocomponente" style={{ backgroundColor: settings.background_color }}>
            <p>{settings.text}</p>
        </div>
    );
};

export default NovoComponente;