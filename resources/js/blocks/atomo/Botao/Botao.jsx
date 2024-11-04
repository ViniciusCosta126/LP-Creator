import React, { useEffect, useState } from 'react';
import './Botao.css';
import config from './config.json';

const Botao = () => {
    const [settings, setSettings] = useState(config.atributos);

    useEffect(() => {
    
    }, [settings]);

    return (
        <div className="botao" style={{ backgroundColor: settings.background_color.default }}>
            <p>{settings.text.default}</p>
        </div>
    );
};

export default Botao;