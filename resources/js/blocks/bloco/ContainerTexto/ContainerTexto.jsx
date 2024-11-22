import React, { useEffect, useState } from "react";
import styles from "./ContainerTexto.module.css";
import config from "./config.json";
import BarConfig from "./BarConfig";
import Container from "../../elemento/Container/Container";
import Typography from "../../elemento/Typography/Typography";

const ContainerTexto = () => {
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
                className="containertexto"
                style={{
                    backgroundColor: settings.background_color.default,
                    marginTop: settings.margin_top.default + "px",
                    marginBottom: settings.margin_bottom.default + "px",
                    paddingTop: settings.padding_top.default + "px",
                    paddingBottom: settings.padding_bottom.default + "px",
                }}
                onClick={(e) => handleOpen(true)}
            >
                <Container>
                    <Typography />
                </Container>
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

export default ContainerTexto;
