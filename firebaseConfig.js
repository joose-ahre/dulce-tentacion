
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Función para obtener productos de Firebase
async function obtenerProductosFirebase() {
  try {
    const productosCol = collection(db, "productos");
    const snapshot = await getDocs(productosCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos de Firebase:", error);
    return [];
  }
}

// Función para renderizar productos en HTML
async function renderProductosFirebase() {
  const contenedor = document.getElementById("products-grid");
  if (!contenedor) return;

  const productos = await obtenerProductosFirebase();
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <div class="product-icon">${prod.icono || ""}</div>
      <h4 class="product-name">${prod.nombre}</h4>
      <p class="product-price">Precio: $${prod.precio}</p>
      <p class="product-desc">${prod.descripcion || ""}</p>
    `;
    contenedor.appendChild(div);
  });
}

// Ejecutar la función
renderProductosFirebase();
