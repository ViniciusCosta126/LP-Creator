
import { useState } from 'react'
import styles from './main.module.css'
import componentsConfig from '../../componentes.json'

export const SideBar = ({loadComponent}) => {
    const [openSidebar, setOpenSideBar] = useState(false);


    const componentNames = componentsConfig.map(comp => comp.name);
    const componentPaths = componentsConfig.map(comp => comp.path);



    return (
        <div className={styles.containerSidebar}>
            <button onClick={() => setOpenSideBar(!openSidebar)}>Abrir sidebar</button>
            <div className={openSidebar ? styles.containerOpen : styles.container}>
                <h2 className={styles.titleSideBar}>Árvore de componentes</h2>
                <ul className={styles.componentContainer}>
                    {componentNames.map((name, index) => (
                        <li className={styles.componentItem} key={name} onClick={() => loadComponent(componentPaths[index])}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
