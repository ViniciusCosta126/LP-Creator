import { useState } from "react";
import styles from "./main.module.css";
import componentsConfig from "../../componentes.json";
import { FaBars } from "react-icons/fa";

export const SideBar = ({ loadComponent, setOpenSideBar, openSidebar }) => {
    const componentNames = componentsConfig.map((comp) => comp.name);
    const componentPaths = componentsConfig.map((comp) => comp.path);
    const componentCategories = componentsConfig.map((comp) => comp.categoria);
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

                <h3 className={styles.categoriaTitulo}>Elementos</h3>
                <ul className={styles.componentContainer}>
                    {componentNames.map((name, index) => {
                        if (componentCategories[index] === "elemento") {
                            return (
                                <li
                                    className={styles.componentItem}
                                    key={name}
                                    onClick={() =>
                                        loadComponent(componentPaths[index])
                                    }
                                >
                                    {name}
                                </li>
                            );
                        }
                    })}
                </ul>

                <h3 className={styles.categoriaTitulo}>Blocos</h3>
                <ul className={styles.componentContainer}>
                    {componentNames.map((name, index) => {
                        if (componentCategories[index] === "bloco") {
                            return (
                                <li
                                    className={styles.componentItem}
                                    key={name}
                                    onClick={() =>
                                        loadComponent(componentPaths[index])
                                    }
                                >
                                    {name}
                                </li>
                            );
                        }
                    })}
                </ul>

                <h3 className={styles.categoriaTitulo}>Seções</h3>
                <ul className={styles.componentContainer}>
                    {componentNames.map((name, index) => {
                        if (componentCategories[index] === "secoes") {
                            return (
                                <li
                                    className={styles.componentItem}
                                    key={name}
                                    onClick={() =>
                                        loadComponent(componentPaths[index])
                                    }
                                >
                                    {name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </>
    );
};
