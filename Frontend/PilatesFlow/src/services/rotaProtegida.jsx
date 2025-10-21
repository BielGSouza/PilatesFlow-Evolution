import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function RotaProtegida({ children }) {
    const [eAutenticado, setEAutenticado] = useState(null);

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setEAutenticado(false);
                    return;
                }

                await api.get("/usuario/perfil", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEAutenticado(true);
            } catch (error) {
                console.error("Erro ao verificar token:", error);
                setEAutenticado(false);
            }
        }

        verificarToken();
    }, []);

    // Enquanto checamos, não renderizamos nada (ou podemos renderizar um loader)
    if (eAutenticado === null) return null;

    if (!eAutenticado) {
        alert("Sessão expirada. Faça login novamente.");
        return <Navigate to="/" replace />;
    } 

    return children;
}

export default RotaProtegida;
