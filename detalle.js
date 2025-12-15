

// -----------------------------
// DETALLE.JS - Historial de Compras
// -----------------------------
const historyList = document.getElementById("history-list");
let historial = JSON.parse(localStorage.getItem("historial")) || [];

function mostrarHistorial() {
    historyList.innerHTML = "";

    if (historial.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <h3>No hay compras registradas</h3>
                <p>Cuando realices compras aparecerán aquí.</p>
            </div>
        `;
        return;
    }

    let totalAcumulado = 0;

    historial.forEach((compra, index) => {
        totalAcumulado += compra.total;

        const item = document.createElement("div");
        item.classList.add("history-item");

        item.innerHTML = `
            <div class="history-header">
                <h3>Compra #${index + 1}</h3>
                <span class="fecha">${compra.fecha}</span>
            </div>

            <div class="productos-list">
                ${compra.productos.map(p => `
                    <div class="producto">
                        <span class="icon">${p.icono}</span>
                        <span class="name">${p.nombre}</span>
                        <span class="cantidad">x${p.cantidad}</span>
                        <span class="precio">$${p.precio}</span>
                    </div>
                `).join("")}
            </div>

            <div class="total">
                <strong>Total: </strong>$${compra.total}
            </div>
        `;

        historyList.appendChild(item);
    });

    // Total acumulado al final
    const acumuladoDiv = document.createElement("div");
    acumuladoDiv.classList.add("total-acumulado");
    acumuladoDiv.innerHTML = `
        <h3>Total gastado en todas las compras: $${totalAcumulado}</h3>
    `;
    historyList.appendChild(acumuladoDiv);
}

// Inicializar
mostrarHistorial();
