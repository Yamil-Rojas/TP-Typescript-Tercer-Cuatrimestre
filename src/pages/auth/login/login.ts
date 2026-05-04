
import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
//import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
//const selectRol = document.getElementById("rol") as HTMLSelectElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  
if (!valueEmail || !valuePassword) {
    alert("Ingresá un email y una contraseña");
    return;
  }
  
  const usersJSON = localStorage.getItem("users");
  const users: IUser[] = usersJSON ? JSON.parse(usersJSON) : [];

  const user = users.find(u => u.email === valueEmail);

  if (!user) {
    alert("Usuario no registrado");
    return;
  }

  user.loggedIn = true;
  saveUser(user);

  alert("Login exitoso");

  navigate("/src/pages/client/home/home.html");
});

  