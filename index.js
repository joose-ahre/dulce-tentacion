// -----------------------------
// FIREBASE (CDN)
// -----------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { agregarAlCarrito } from "./carrito.js"; // Importamos función del carrito

// -----------------------------
// CONFIG FIREBASE
// -----------------------------
const firebaseConfig = {
    apiKey: "AIzaSyC-4k4gf9wxOJPYWi3BYs2y2uMEjFg0ZRg",
    authDomain: "dulcetentacion-d1a4a.firebaseapp.com",
    projectId: "dulcetentacion-d1a4a",
    storageBucket: "dulcetentacion-d1a4a.firebasestorage.app",
    messagingSenderId: "945332344572",
    appId: "1:945332344572:web:62790bf16f34ae2ece6979"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------
// ELEMENTOS DEL DOM
// -----------------------------
const grid = document.getElementById("products-grid");
const botonesFiltro = document.querySelectorAll(".filter-btn");

const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const loginClose = document.getElementById("login-close");
const loginSubmit = document.getElementById("login-submit");

let productos = [];

// -----------------------------
// CARGAR PRODUCTOS DESDE FIRESTORE
// -----------------------------
async function cargarProductos() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    productos = [];

    querySnapshot.forEach((doc) => {
        productos.push({
            id: doc.id,
            nombre: doc.data().nombre || "Sin nombre",
            descripcion: doc.data().descripcion || "",
            precio: doc.data().precio ?? 0,
            categoria: doc.data().categoria || "Sin categoría",
            icono: doc.data().icono || "🧁"
        });
    });

    mostrarProductos("todos");
}

// -----------------------------
// MOSTRAR PRODUCTOS
// -----------------------------
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
                <span class="category-badge ${p.categoria}">
                    ${p.categoria.toUpperCase()}
                </span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${p.nombre}</h4>
                <p class="product-description">${p.descripcion}</p>
                <p class="product-price">$${p.precio}</p>
                <button class="btn btn-primary">
                    Añadir al Carrito <i class="fa fa-cart-plus"></i>
                </button>
            </div>
        `;

        // Agregar producto al carrito (pasando TODO el objeto)
        card.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(p); // <-- aquí va el objeto completo
        });

        grid.appendChild(card);
    });
}

// -----------------------------
// FILTROS
// -----------------------------
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(b => b.classList.remove("active"));
        boton.classList.add("active");
        mostrarProductos(boton.dataset.category);
    });
});

// -----------------------------
// LOGIN MODAL
// -----------------------------
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.remove("hidden");
});

loginClose.addEventListener("click", () => {
    loginModal.classList.add("hidden");
});

loginSubmit.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        alert("Login exitoso");
        loginModal.classList.add("hidden");
    } else {
        document.getElementById("login-error").textContent =
            "Usuario o contraseña incorrectos";
    }
});

// -----------------------------
// INICIAR
// -----------------------------
cargarProductos();
