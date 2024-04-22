import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import './index.css';

import App from "./App";
import { store } from "./redux/store";

import { BrowserRouter as Router} from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>

);
