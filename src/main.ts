import { getUSer } from "./utils/localStorage";
import type { IUser } from "./types/IUser";
// Obtener ruta actual
const currentPath = window.location.pathname;

// Obtener usuario en sesión
const userData = getUSer();
//Parseamos el usuario para trabajarlo como objeto tipado (localStorage devulve strings)
const user: IUser | null = userData ? JSON.parse(userData) : null


// Rutas públicas (no requieren login)
const publicRoutes = [
  "/src/pages/auth/login/login.html",
  "/src/pages/auth/registro/registro.html",
];

// 1️⃣ Si NO hay sesión y quiere entrar a algo privado → login
if (!user && !publicRoutes.includes(currentPath)) {
  window.location.href = "/src/pages/auth/login/login.html";
}

// 2️⃣ Si hay sesión, validar rol
if (user) {
  // Usuario client intentando entrar a admin
  if (
    user.role === "client" &&
    currentPath.includes("/admin")
  ) {
    window.location.href = "/src/pages/client/home/home.html";
  }

  // Usuario admin intentando entrar a client
  if (
    user.role === "admin" &&
    currentPath.includes("/client")
  ) {
    window.location.href = "/src/pages/admin/home/home.html";
  }
}
// ===================================
// Importar módulos de páginas
// ===================================
import "./pages/auth/registro/registro";
import "./pages/auth/login/login";


