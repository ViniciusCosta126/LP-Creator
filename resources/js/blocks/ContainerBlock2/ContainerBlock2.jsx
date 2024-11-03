import React, { useEffect, useState } from 'react';
import './ContainerBlock2.css';
import config from './config.json';

const ContainerBlock2 = () => {
    const [settings, setSettings] = useState(config.settings);

    useEffect(() => {
        console.log('Configurações do bloco:', settings);
    }, [settings]);

    return (
        <div className="block-containerblock2" style={{ backgroundColor: settings.background_color }}>
            <p>{settings.text}</p>
        </div>
    );
};

export default ContainerBlock2;