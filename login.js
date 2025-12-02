function iniciarSesion() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const errorMsg = document.getElementById("login-error");

    if (user === "" || pass === "") {
        errorMsg.textContent = "Por favor completa todos los campos.";
        return;
    }

    if (user === "admin" && pass === "1234") {
        alert("Inicio de sesión exitoso");
        window.location.href = "index.html";
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
}
