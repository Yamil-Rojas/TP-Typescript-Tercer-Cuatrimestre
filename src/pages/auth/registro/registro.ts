import type { IUser } from "../../../types/IUser";

console.log("✅ registro.ts ejecutado");

const form = document.getElementById("registroForm") as HTMLFormElement | null;

if (!form) {
  // No estamos en la página de registro
  console.warn("Formulario de registro no encontrado");
} else {
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Obtener usuarios existentes
    const usersJSON = localStorage.getItem("users");
    const users: IUser[] = usersJSON ? JSON.parse(usersJSON) : [];

    // Verificar duplicados
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("El email ya está registrado");
      return;
    }

    // Crear nuevo usuario
    const newUser: IUser = {
      email,
      loggedIn: false,
      role: "client",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado correctamente");
    form.reset();
  });
}