import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import config from "./config.json";
import BarConfig from "./BarConfig";

const Container = ({ children }) => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);
    const title = config.title;

    useEffect(() => {}, [settings]);
    const handleOpen = (e) => {
        setIsOpen(true);
        e.stopPropagation();
    };
    return (
        <>
            <div
                className={styles.container}
                style={{
                    backgroundColor: settings.background_color.default,
                    marginTop: settings.margin_top.default + "px",
                    marginBottom: settings.margin_bottom.default + "px",
                    paddingTop: settings.padding_top.default + "px",
                    paddingBottom: settings.padding_bottom.default + "px",
                }}
                onClick={(e) => handleOpen(e)}
            >
                {children}
            </div>
            <BarConfig
                title={title}
                setSettings={setSettings}
                settings={settings}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
};

export default Container;
