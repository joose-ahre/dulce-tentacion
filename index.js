

const productos = [
    // Tradicional
    {
        id: 1,
        nombre: "Torta Oreo",
        categoria: "tradicional",
        precio: 3500,
        descripcion: "Deliciosa torta con base de galletas Oreo y crema.",
        icono: "🍰"
    },
    {
        id: 2,
        nombre: "Flan Casero",
        categoria: "tradicional",
        precio: 1500,
        descripcion: "Flan tradicional con dulce de leche.",
        icono: "🍮"
    },
    {
        id: 3,
        nombre: "Cheesecake Frutal",
        categoria: "tradicional",
        precio: 3200,
        descripcion: "Clásico cheesecake con frutos rojos.",
        icono: "🍓"
    },

    // Sin TACC
    {
        id: 4,
        nombre: "Budín de Limón (Sin TACC)",
        categoria: "sin-tacc",
        precio: 1800,
        descripcion: "Budín esponjoso apto para celíacos.",
        icono: "🍋"
    },
    {
        id: 5,
        nombre: "Chocolate Cake (Sin TACC)",
        categoria: "sin-tacc",
        precio: 2400,
        descripcion: "Bizcochuelo húmedo de chocolate sin gluten.",
        icono: "🍫"
    },

    // Fitness
    {
        id: 6,
        nombre: "Cheesecake Proteico",
        categoria: "fitness",
        precio: 2800,
        descripcion: "Cheesecake bajo en azúcar y alto en proteínas.",
        icono: "💪"
    },
    {
        id: 7,
        nombre: "Brownie Fit",
        categoria: "fitness",
        precio: 1700,
        descripcion: "Brownie sin azúcar con cacao puro.",
        icono: "🍫"
    }
];

// Cargar productos
const grid = document.getElementById("products-grid");
const botonesFiltro = document.querySelectorAll(".filter-btn");

function mostrarProductos(categoria) {
    grid.innerHTML = "";

    const filtrados = categoria === "todos"
        ? productos
        : productos.filter(p => p.categoria === categoria);

    filtrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image">
                ${p.icono}
                <span class="category-badge ${p.categoria}">${p.categoria.toUpperCase()}</span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${p.nombre}</h4>
                <p class="product-description">${p.descripcion}</p>
                <p class="product-price">$${p.precio}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">
                    Añadir al Carrito <i class="fa fa-cart-plus"></i>
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

mostrarProductos("todos");

// Filtros
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(b => b.classList.remove("active"));
        boton.classList.add("active");
        mostrarProductos(boton.dataset.category);
    });
});

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById("cart-count").textContent = `(${carrito.length})`;
}

actualizarCarrito();

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
    alert("Producto añadido al carrito");
}

// Modal Login
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const loginClose = document.getElementById("login-close");
const loginSubmit = document.getElementById("login-submit");

loginBtn.addEventListener("click", () => loginModal.style.display = "block");
loginClose.addEventListener("click", () => loginModal.style.display = "none");

loginSubmit.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        alert("Login exitoso");
        loginModal.style.display = "none";
    } else {
        document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos";
    }
});


import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Función para obtener productos desde Firebase
async function obtenerProductosFirebase() {
  try {
    const productosCol = collection(db, "productos");
    const snapshot = await getDocs(productosCol);
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productos;
  } catch (error) {
    console.error("Error al obtener productos de Firebase:", error);
    return [];
  }
}

// Función para mostrar productos en consola (opcional para verificar)
async function mostrarProductosFirebase() {
  const productos = await obtenerProductosFirebase();
  console.log("Productos desde Firebase:", productos);
}

// Función para renderizar productos en el HTML
async function renderProductosFirebase() {
  const contenedor = document.getElementById("products-grid");
  if (!contenedor) return;

  const productos = await obtenerProductosFirebase();
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("product-card"); // opcional para CSS
    div.innerHTML = `
      <div class="product-icon">${prod.icono || ""}</div>
      <h4 class="product-name">${prod.nombre}</h4>
      <p class="product-price">Precio: $${prod.precio}</p>
      <p class="product-desc">${prod.descripcion || ""}</p>
    `;
    contenedor.appendChild(div);
  });
}

// Ejecutar funciones al cargar la página
mostrarProductosFirebase();
renderProductosFirebase();
