import { db } from "./firebaseConfig.js";

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

const cartContent = document.getElementById("cart-content");

function mostrarCarrito() {
    cartContent.innerHTML = "";

    if (carrito.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para continuar con la compra.</p>
            </div>
        `;
        return;
    }

    const productosHtml = document.createElement("div");
    const resumenHtml = document.createElement("div");

    productosHtml.innerHTML = "";
    productosHtml.style.gridColumn = "1";

    resumenHtml.classList.add("summary-card");
    resumenHtml.style.gridColumn = "2";

    let total = 0;

    carrito.forEach((p, index) => {
        total += p.precio;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
            <div class="cart-item-image" style="background:#764ba2;">
                ${p.icono}
            </div>

            <div class="cart-item-info">
                <p class="cart-item-name">${p.nombre}</p>
                <p class="cart-item-category">${p.categoria.toUpperCase()}</p>
                <p class="cart-item-price">$${p.precio}</p>
            </div>

            <button class="remove-btn" onclick="eliminarProducto(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        productosHtml.appendChild(item);
    });

    resumenHtml.innerHTML = `
        <h3>Resumen de Compra</h3>
        <div class="summary-row">
            <span>Cantidad:</span>
            <span>${carrito.length} productos</span>
        </div>

        <div class="summary-row total">
            <span>Total:</span>
            <span>$${total}</span>
        </div>

        <div class="cart-actions">
            <button class="btn btn-success" onclick="finalizarCompra()">Finalizar Compra</button>
            <button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar Carrito</button>
        </div>
    `;

    cartContent.appendChild(productosHtml);
    cartContent.appendChild(resumenHtml);
}

mostrarCarrito();

// Eliminar un producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const fechaActual = new Date().toLocaleString();

    const compra = {
        productos: carrito.map(p => ({
            nombre: p.nombre,
            precio: p.precio,
            icono: p.icono,
            cantidad: 1
        })),
        total: carrito.reduce((acc, p) => acc + p.precio, 0),
        fecha: fechaActual
    };

    historial.push(compra);

    localStorage.setItem("historial", JSON.stringify(historial));
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Compra finalizada con éxito");
    mostrarCarrito();
}
