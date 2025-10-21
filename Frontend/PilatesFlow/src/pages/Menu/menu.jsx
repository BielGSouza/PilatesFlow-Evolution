import React, { useEffect } from 'react';
import api from "../../services/api";

function Menu() {
    useEffect(() => {
        document.title = "PilatesFlow - Dashboard";
    }, []);

    return (
        <>
        <h2>Pagina de menu</h2>
        </>
    )
}

export default Menu;