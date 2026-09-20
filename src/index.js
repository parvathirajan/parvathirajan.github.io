import { createRoot } from "react-dom/client";
import "./index.scss";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(<App />);
serviceWorker.unregister();
