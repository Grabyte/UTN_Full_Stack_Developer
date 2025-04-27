import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggingIn: boolean = false;

  toggleLogin() {
    // Incluir logica de incio de sesión aqui
    // Por ejemplo, puedes cambiar el estado de isLoggingIn
    // para mostrar u ocultar el formulario de inicio de sesión
    // o redirigir a otra página.
    // Aquí solo estamos alternando el valor de isLoggingIn
    // como un ejemplo.
    // Puedes reemplazar esto con la lógica real de inicio de sesión.
    // Por ejemplo, puedes usar un servicio de autenticación
    // para manejar la autenticación de usuarios.
    // authorization -> firebase
    this.isLoggingIn = !this.isLoggingIn;
  }
}
