import React from "react";
import { MdClose } from "react-icons/md";

const BarConfig = ({ setSettings, settings, isOpen, setIsOpen }) => {
    function closeModal(e) {
        setIsOpen(false);
        e.stopPropagation();
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
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className="bar-config show" onClick={e=>e.stopPropagation()}>
            <h2>Ajuste as configurações do seu componente</h2>
            <button onClick={closeModal}>
                <MdClose />
            </button>
            <form>
                {Object.keys(settings).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
                        {settings[key].tipo === "select" ? (
                            <select
                                value={settings[key].default}
                                onChange={(e) => handleSettings(e, key)}
                            >
                                {settings[key].opcoes.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={settings[key].tipo}
                                value={settings[key].default}
                                onChange={(e) => handleSettings(e, key)}
                            />
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default BarConfig;
