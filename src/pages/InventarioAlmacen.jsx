import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function InventarioAlmacen() {
  const { id } = useParams(); // Obtiene el ID del almacén desde la URL
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/inventario/${id}`) // Llama al backend
      .then((response) => {
        setInventario(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el inventario:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="card">
      <h2>Inventario del Almacén #{id}</h2>
      <DataTable
        value={inventario}
        className="p-datatable-sm"
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column field="nombre" header="Producto"></Column>
        <Column field="descripcion" header="Descripción"></Column>
        <Column field="cantidad" header="Cantidad"></Column>
      </DataTable>
      <Button
        label="Agregar Productos"
        icon="pi pi-plus"
        className="p-button-success mt-3"
        onClick={() => (window.location.href = `/almacenes/${id}/productos`)}
      />
    </div>
  );
}

export default InventarioAlmacen;
