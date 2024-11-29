import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido al Sistema de Inventario</h1>
      <p>Selecciona una opción:</p>
      <ul>
        <li>
          <Link to="/almacenes/1/inventario">Ver Inventario del Almacén 1</Link>
        </li>
        <li>
          <Link to="/almacenes/1/productos">Agregar Productos al Almacén 1</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
