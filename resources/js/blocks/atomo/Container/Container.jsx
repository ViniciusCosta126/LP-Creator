import React, { useEffect, useState } from "react";
import "./Container.css";
import config from "./config.json";

const Container = () => {
    const [settings, setSettings] = useState(config.atributos);

    useEffect(() => {}, [settings]);

    return (
        <div
            className="container"
            style={{ backgroundColor: settings.background_color.default }}
        >
            <p>{settings.text.default}</p>
        </div>
    );
};

export default Container;
