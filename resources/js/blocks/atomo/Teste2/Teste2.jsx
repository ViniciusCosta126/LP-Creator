import React, { useEffect, useState } from 'react';
import styles from './Teste2.module.css';
import config from './config.json';
import BarConfig from './BarConfig';

const Teste2 = () => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    
    }, [settings]);

    return (
        <div className="teste2" style={{ backgroundColor: settings.background_color.default }} onClick={()=>setIsOpen(true)}>
            <p>{settings.text.default}</p>
            <BarConfig setSettings={setSettings} settings={settings} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Teste2;