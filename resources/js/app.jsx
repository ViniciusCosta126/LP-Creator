import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Teste from "./blocks/Teste/Teste";


const App = () => {
    return (
        <div>
            <Teste/>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
