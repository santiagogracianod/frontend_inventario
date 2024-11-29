import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";

function Navbar() {
  const items = [
    { label: "Inventario", icon: "pi pi-box", command: () => (window.location.href = "/almacenes/1/inventario") },
    { label: "Agregar Productos", icon: "pi pi-plus", command: () => (window.location.href = "/almacenes/1/productos") },
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
}

export default Navbar;
