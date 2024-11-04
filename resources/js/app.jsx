import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";

import { SideBar } from "./layout/Sidebar/SideBar";
import { useState } from "react";

const App = () => {
    const [components, setComponents] = useState([]); // Armazena os componentes carregados
    const [openSidebar, setOpenSideBar] = useState(false);

    const loadComponent = async (componentPath) => {
        try {
            const ImportedComponent = (
                await import(/* @vite-ignore */ `${componentPath}`)
            ).default;
            // Adiciona o novo componente ao array
            setComponents((prevComponents) => [
                ...prevComponents,
                ImportedComponent,
            ]);
        } catch (error) {
            console.error(`Erro ao importar o componente: ${error}`);
        }
    };

    return (
        <div className={`container ${openSidebar ? "" : "sidebar-hidden"}`}>
            <SideBar
                loadComponent={loadComponent}
                setOpenSideBar={setOpenSideBar}
                openSidebar={openSidebar}
            />
            <div className="content">
                {/* Renderiza cada componente da lista de componentes carregados */}
                {components.map((Component, index) => (
                    <Component key={index} />
                ))}
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
