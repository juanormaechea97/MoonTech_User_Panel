import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  standalone: true, 
  imports: [FormsModule] // ✅ Asegurar que FormsModule está disponible en este componente
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/users']);
      },
      (err) => {
        alert('Login incorrecto');
      }
    );
  }
}
