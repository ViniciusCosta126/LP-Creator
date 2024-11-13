import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";

import { SideBar } from "./layout/Sidebar/SideBar";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
    const [components, setComponents] = useState([]); // Armazena os componentes carregados
    const [openSidebar, setOpenSideBar] = useState(false);

    const loadComponent = async (componentPath) => {
        try {
            const ImportedComponent = (
                await import(/* @vite-ignore */ `${componentPath}`)
            ).default;
            // Adiciona o novo componente ao array com uma chave única
            setComponents((prevComponents) => [
                ...prevComponents,
                { id: Date.now(), Component: ImportedComponent },
            ]);
        } catch (error) {
            console.error(`Erro ao importar o componente: ${error}`);
        }
    };

    const handleSort = (newList) => {
        // Atualiza a ordem dos componentes sem perder o estado
        setComponents(newList);
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
                <ReactSortable
                    list={components}
                    setList={handleSort}
                    handleSort={handleSort} // Garante que a ordem seja mantida
                >
                    {components.map(({ id, Component }, index) => (
                        <Component key={id} />
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
