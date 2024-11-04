import { useState } from "react";
import styles from "./main.module.css";
import componentsConfig from "../../componentes.json";
import { FaBars } from "react-icons/fa";

export const SideBar = ({ loadComponent, setOpenSideBar, openSidebar }) => {
    const componentNames = componentsConfig.map((comp) => comp.name);
    const componentPaths = componentsConfig.map((comp) => comp.path);

    return (
        <>
            <div className="header">
                <button
                    className={styles.hamburguer}
                    onClick={() => setOpenSideBar(!openSidebar)}
                >
                    <FaBars />
                    Menu
                </button>
            </div>
            <div className={`sidebar ${openSidebar ? "show" : "hidden"}`}>
                <h2 className={styles.titleSideBar}>Árvore de componentes</h2>
                <ul className={styles.componentContainer}>
                    {componentNames.map((name, index) => (
                        <li
                            className={styles.componentItem}
                            key={name}
                            onClick={() => loadComponent(componentPaths[index])}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
