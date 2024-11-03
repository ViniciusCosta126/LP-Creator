import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";

import { SideBar } from "./layout/Sidebar/SideBar";
import { useState } from "react";



const App = () => {
    const [ActiveComponent, setActiveComponent] = useState(null);

    const loadComponent = async (componentPath) => {
        try {
            const importedComponent = (await import(/* @vite-ignore */ `${componentPath}`)).default;
            setActiveComponent(() => importedComponent);
        } catch (error) {
            console.error(`Erro ao importar o componente: ${error}`);
            setActiveComponent(null);
        }
    };

    return (
        <div className="containerAside">
            <SideBar loadComponent={loadComponent}/>
            {ActiveComponent && <ActiveComponent />}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
