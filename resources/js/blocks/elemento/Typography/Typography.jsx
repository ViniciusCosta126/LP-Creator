import React, { useEffect, useState } from "react";
import styles from "./Typography.module.css";
import config from "./config.json";
import BarConfig from "./BarConfig";

const Typography = () => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {}, [settings]);
    const Tag = settings.tag.default;

    return (
        <>
            <Tag
                className="typography"
                style={{
                    backgroundColor: settings.background_color.default,
                    marginTop: settings.margin_top.default + "px",
                    marginBottom: settings.margin_bottom.default + "px",
                    paddingTop: settings.padding_top.default + "px",
                    paddingBottom: settings.padding_bottom.default + "px",
                    fontSize: settings.font_size.default + "px",
                    color: settings.color.default,
                }}
                onClick={() => setIsOpen(true)}
            >
                {settings.text.default}
            </Tag>
            <BarConfig
                setSettings={setSettings}
                settings={settings}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
};

export default Typography;
