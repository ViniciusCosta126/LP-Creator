import React from "react";
import { MdClose } from "react-icons/md";

const BarConfig = ({ setSettings, settings, isOpen, setIsOpen }) => {
    function closeModal(e) {
        e.stopPropagation();
        setIsOpen(false);
    }

    const handleSettings = (e, key) => {
        const newSettings = {
            ...settings,
            [key]: {
                ...settings[key],
                default: e.target.value,
            },
        };
        setSettings(newSettings);
    };

    if (!isOpen) return null;

    return (
        <div className="bar-config show">
            <h2>Ajuste as configurações do seu componente</h2>
            <button onClick={closeModal}>
                <MdClose />
            </button>
            <form>
                {Object.keys(settings).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{key}</label>
                        <input
                            type={settings[key].tipo}
                            value={settings[key].default}
                            onChange={(e) => handleSettings(e, key)}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};

export default BarConfig;
