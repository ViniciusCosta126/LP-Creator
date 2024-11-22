import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";

import { SideBar } from "./layout/Sidebar/SideBar";
import { ReactSortable } from "react-sortablejs";
import { useRef, useState } from "react";

const App = () => {
    const [components, setComponents] = useState([]);
    const [openSidebar, setOpenSideBar] = useState(false);

    const contentRef = useRef(null);

    const loadComponent = async (componentPath) => {
        try {
            const ImportedComponent = (
                await import(/* @vite-ignore */ `${componentPath}`)
            ).default;
            setComponents((prevComponents) => [
                ...prevComponents,
                { id: Date.now(), Component: ImportedComponent },
            ]);
        } catch (error) {
            console.error(`Erro ao importar o componente: ${error}`);
        }
    };

    const handleSort = (newList) => {
        setComponents(newList);
    };

    const exportHTML = () => {
        if (!contentRef.current) return;

        const clone = contentRef.current.cloneNode(true);
        const barConfigs = clone.querySelectorAll(".bar-config");
        barConfigs.forEach((el) => el.remove());
        const htmlContent = clone.innerHTML;

        const fullHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Exported Content</title>
                <style>
                    /* Adicione estilos customizados aqui */
                    body {
                        font-family: Arial, sans-serif;
                    }
                </style>
            </head>
            <body>
                <div class="content">
                    ${htmlContent}
                </div>
            </body>
            </html>`;

        const blob = new Blob([fullHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported-content.html";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`container ${openSidebar ? "" : "sidebar-hidden"}`}>
            <SideBar
                loadComponent={loadComponent}
                setOpenSideBar={setOpenSideBar}
                openSidebar={openSidebar}
                exportHTML={exportHTML}
            />
            <div className="content" ref={contentRef}>
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
