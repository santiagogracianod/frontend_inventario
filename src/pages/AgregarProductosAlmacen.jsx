import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../axiosConfig";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function AgregarProductosAlmacen() {
  const { id } = useParams(); // Obtiene el ID del almacén desde la URL
  const toast = useRef(null); // Referencia para mostrar mensajes
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(null);
  const [idCategoria, setIdCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [cantidad, setCantidad] = useState(null);
  const [fechaCreacion, setFechaCreacion] = useState(new Date());
  const [fechaActualizacion, setFechaActualizacion] = useState(new Date());

  // Cargar la lista de categorías desde el backend
  useEffect(() => {
    axios
      .get("/api/categorias") // Endpoint para obtener categorías
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Error al cargar las categorías:", error));
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/inventario/${id}`, {
        nombre: producto,
        descripcion,
        precio,
        id_categoria: idCategoria,
        cantidad,
        fecha_creacion: fechaCreacion.toISOString().split("T")[0], // Convertir a formato YYYY-MM-DD
        fecha_actualizacion: fechaActualizacion.toISOString().split("T")[0],
      })
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto agregado exitosamente",
          life: 3000,
        });
        setProducto("");
        setDescripcion("");
        setPrecio(null);
        setIdCategoria(null);
        setCantidad(null);
        setFechaCreacion(new Date());
        setFechaActualizacion(new Date());
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo agregar el producto",
          life: 3000,
        });
      });
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <h2>Agregar Producto al Almacén #{id}</h2>
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="field">
          <label htmlFor="producto">Nombre del Producto</label>
          <InputText
            id="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="precio">Precio</label>
          <InputNumber
            id="precio"
            value={precio}
            onValueChange={(e) => setPrecio(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="categoria">Categoría</label>
          <Dropdown
            id="categoria"
            value={idCategoria}
            options={categorias}
            onChange={(e) => setIdCategoria(e.value)}
            optionLabel="nombre"
            placeholder="Seleccione una categoría"
            className="mb-3"
          />
        </div>
        <div className="field">
          <label htmlFor="cantidad">Cantidad</label>
          <InputNumber
            id="cantidad"
            value={cantidad}
            onValueChange={(e) => setCantidad(e.value)}
            required
            min={0}
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Creación</label>
          <Calendar
            id="fechaCreacion"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.value)}
            dateFormat="yy-mm-dd"
            showIcon
            required
          />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">Fecha de Actualización</label>
          <Calendar
            id="fechaActualizacion"
            value={fechaActualizacion}
            onChange={(e) => setFechaActualizacion(e.value)}
            dateFormat="yy-mm-dd"
            showIcon
            required
          />
        </div>
        <Button type="submit" label="Agregar Producto" icon="pi pi-check" />
      </form>
    </div>
  );
}

export default AgregarProductosAlmacen;
