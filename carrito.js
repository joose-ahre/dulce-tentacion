// -----------------------------
// CARRITO.JS
// -----------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let historial = JSON.parse(localStorage.getItem("historial")) || [];

const cartContent = document.getElementById("cart-content");
const cartCountEl = document.getElementById("cart-count"); // mostrar cantidad en navbar

// -----------------------------
// MOSTRAR CARRITO
// -----------------------------
export function mostrarCarrito() {
    // Actualizar contador en navbar
    actualizarContador();

    if (!cartContent) return; // si estamos en index.html no hay div de carrito

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

    productosHtml.style.gridColumn = "1";
    resumenHtml.classList.add("summary-card");
    resumenHtml.style.gridColumn = "2";

    let total = 0;

    carrito.forEach((p, index) => {
        const categoria = p.categoria || "Sin categoría";
        const icono = p.icono || "🧁";
        const nombre = p.nombre || "Sin nombre";
        const precio = p.precio ?? 0;

        total += precio;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
            <div class="cart-item-image" style="background:#764ba2;">
                ${icono}
            </div>
            <div class="cart-item-info">
                <p class="cart-item-name">${nombre}</p>
                <p class="cart-item-category">${categoria.toUpperCase()}</p>
                <p class="cart-item-price">$${precio}</p>
            </div>
            <button class="remove-btn" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        item.querySelector(".remove-btn").addEventListener("click", () => eliminarProducto(index));

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
            <button class="btn btn-success" id="finalizar-compra">Finalizar Compra</button>
            <button class="btn btn-danger" id="vaciar-carrito">Vaciar Carrito</button>
        </div>
    `;

    cartContent.appendChild(productosHtml);
    cartContent.appendChild(resumenHtml);

    document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
}

// -----------------------------
// AGREGAR PRODUCTO AL CARRITO
// -----------------------------
export function agregarAlCarrito(producto) {
    const prod = {
        id: producto.id,
        nombre: producto.nombre || "Sin nombre",
        descripcion: producto.descripcion || "",
        precio: producto.precio ?? 0,
        categoria: producto.categoria || "Sin categoría",
        icono: producto.icono || "🧁"
    };

    carrito.push(prod);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// -----------------------------
// FUNCIONES AUXILIARES
// -----------------------------
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const fechaActual = new Date().toLocaleString();
    const totalCompra = carrito.reduce((acc, p) => acc + (p.precio ?? 0), 0);

    const compra = {
        productos: carrito.map(p => ({
            nombre: p.nombre,
            precio: p.precio,
            icono: p.icono,
            cantidad: 1
        })),
        total: totalCompra,
        fecha: fechaActual
    };

    historial.push(compra);
    localStorage.setItem("historial", JSON.stringify(historial));

    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`Compra finalizada con éxito\nTotal gastado: $${totalCompra}`);
    mostrarCarrito();
}

// -----------------------------
// ACTUALIZAR CONTADOR EN NAVBAR
// -----------------------------
function actualizarContador() {
    if (!cartCountEl) return;
    cartCountEl.textContent = `(${carrito.length})`;
}

// Inicializar
mostrarCarrito();

