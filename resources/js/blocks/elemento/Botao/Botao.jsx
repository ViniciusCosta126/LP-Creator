import React, { useEffect, useState } from "react";
import styles from "./Botao.module.css";
import config from "./config.json";
import BarConfig from "./BarConfig";

const Botao = () => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {}, [settings]);

    return (
        <>
            <botao
                className={styles.botao}
                style={{
                    backgroundColor: settings.background_color.default,
                    marginTop: settings.margin_top.default + "px",
                    marginBottom: settings.margin_bottom.default + "px",
                    paddingTop: settings.padding_top.default + "px",
                    paddingBottom: settings.padding_bottom.default + "px",
                    borderRadius: settings.border_radius.default + "px",
                    color: settings.color.default,
                    fontWeight: settings.font_weight.default,
                }}
                onClick={() => setIsOpen(true)}
            >
                {settings.text.default}
            </botao>
            <BarConfig
                setSettings={setSettings}
                settings={settings}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
};

export default Botao;
