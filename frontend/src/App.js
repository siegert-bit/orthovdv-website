import "@/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Klacht from "./pages/Klacht";
import { Toaster } from "./components/ui/sonner";

// De router zelf (BrowserRouter) staat in index.js, zodat de pagina's ook
// vooraf als gewone HTML gebouwd kunnen worden (zie scripts/prerender.js).
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/klachten/:slug" element={<Klacht />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
