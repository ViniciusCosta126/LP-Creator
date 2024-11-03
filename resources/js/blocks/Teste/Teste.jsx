import React, { useEffect, useState } from 'react';
import './Teste.css';
import config from './config.json';

const Teste = () => {
    const [settings, setSettings] = useState(config.settings);

    useEffect(() => {
        console.log('Configurações do bloco:', settings);
    }, [settings]);

    return (
        <div className="block-teste" style={{ backgroundColor: settings.background_color }}>
            <p>{settings.text}</p>
        </div>
    );
};

export default Teste;