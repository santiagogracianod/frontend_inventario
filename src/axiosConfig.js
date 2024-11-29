import axios from "axios";

// Configuración global para Axios
axios.defaults.baseURL = "http://localhost:8080"; // URL del backend
axios.defaults.headers.common["X-API-Version"] = "2"; // Versión predeterminada

export default axios;
