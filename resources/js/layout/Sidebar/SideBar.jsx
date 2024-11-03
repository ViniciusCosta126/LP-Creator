
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
                <h1>Árvore de componentes</h1>
                <ul>
                    {componentNames.map((name, index) => (
                        <li key={name} onClick={() => loadComponent(componentPaths[index])}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.mainContent}>
               
            </div>
        </div>
    );
};
