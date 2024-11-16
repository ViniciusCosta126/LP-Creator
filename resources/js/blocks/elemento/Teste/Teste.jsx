import React, { useEffect, useState } from 'react';
import styles from './Teste.module.css';
import config from './config.json';
import BarConfig from './BarConfig';

const Teste = () => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);
    const title = config.title;
    const handleOpen = (e) => {
        setIsOpen(true);
        e.stopPropagation();
    };

    return (
        <>
        <div
            className="teste"
            style={{
                backgroundColor: settings.background_color.default,
                marginTop: settings.margin_top.default + 'px',
                marginBottom: settings.margin_bottom.default + 'px',
                paddingTop: settings.padding_top.default + 'px',
                paddingBottom: settings.padding_bottom.default + 'px',
            }}
            onClick={(e) => handleOpen(true)}
        >
            <p>{settings.text.default}</p>     
        </div>
        <BarConfig title={title} setSettings={setSettings} settings={settings} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default Teste;