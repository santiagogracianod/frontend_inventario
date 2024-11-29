import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InventarioAlmacen from "./pages/InventarioAlmacen";
import AgregarProductosAlmacen from "./pages/AgregarProductosAlmacen";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Rutas específicas */}
        <Route path="/almacenes/:id/inventario" element={<InventarioAlmacen />} />
        <Route path="/almacenes/:id/productos" element={<AgregarProductosAlmacen />} />
      </Routes>
    </Router>
  );
}

export default App;
