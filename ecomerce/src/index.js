import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import React from 'react'
import { CartProvider} from "./context/context.js";
ReactDOM.render(
  // <h1>hi</h1>,
   <CartProvider>
    <App></App>
   </CartProvider>,
    
  
  
  document.getElementById('root')
)
// import React from "react";
// import ReactDOM from "react-dom/client";  // ✅ Correct import for React 18
// import "./index.css";
// import App from "./App.js";
// import { CartProvider } from "./context/context.js";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </React.StrictMode>
// );
