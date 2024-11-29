import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "../axiosConfig";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function AgregarProductosAlmacen() {
  const { id } = useParams(); // Obtiene el ID del almacén desde la URL
  const toast = useRef(null); // Referencia para mostrar mensajes
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(null);
  const [categoria, setCategoria] = useState(null); // Ahora es un string
  const [cantidad, setCantidad] = useState(null);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir el objeto del producto
    const productoData = {
      nombre: producto,
      descripcion,
      precio,
      idCategoria: 5, // Enviar el nombre de la categoría como string
    };

    console.log(productoData);
    

    // Hacer la solicitud POST
    axios
      .post(`/api/almacen/${id}/${cantidad}`, productoData) // cantidad e id en la URL
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto agregado exitosamente",
          life: 3000,
        });

        // Limpiar campos del formulario
        setProducto("");
        setDescripcion("");
        setPrecio(null);
        setCategoria("");
        setCantidad(null);
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
          <InputText
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)} // Permitir entrada como texto
            required
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
        <Button type="submit" label="Agregar Producto" icon="pi pi-check" />
      </form>
    </div>
  );
}

export default AgregarProductosAlmacen;
