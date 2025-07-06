import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Slide, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      autoClose={1500}
      position="bottom-right"
      transition={Slide}
    />
    <App />
  </>
);
