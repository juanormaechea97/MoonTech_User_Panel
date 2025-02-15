import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie'; // ✅ Importación correcta
import animationData from '../../../assets/lottie/moonAnimation.json';
import cloudsAnimation from '../../../assets/lottie/clouds.json';
import { ToastrService } from 'ngx-toastr'; // ✅ Importar Toastr

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  standalone: true, 
  imports: [FormsModule, LottieComponent] // ✅ Agregar LottieComponent en Standalone
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false; // ✅ Nuevo campo para recordar usuario y contraseña
  loading = false; // Estado de carga

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    // ✅ Recuperar email y contraseña si se almacenaron en LocalStorage
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true; // ✅ Marcar la casilla si había datos guardados
    }
  }

  lottieOptions: AnimationOptions = {
    animationData, // 🔹 Carga el JSON directamente en Angular
    loop: true,
    autoplay: true
  };

  cloudsOptions: AnimationOptions = {
    animationData: cloudsAnimation, // ✅ Usa animationData en vez de path
    loop: true,
    autoplay: true
  };

  login() {
    if (!this.email || !this.password) {
      this.toastr.warning('Por favor, ingresa tu email y contraseña.', 'Atención');
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.token) {
          this.authService.saveToken(res.token);
          this.toastr.success('Inicio de sesión exitoso!', 'Bienvenido');

          // ✅ Guardar email y contraseña si el usuario seleccionó "Recuérdame"
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
            localStorage.setItem('rememberedPassword', this.password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }

          this.router.navigate(['/users']);
        } else {
          this.toastr.error('Credenciales incorrectas.', 'Error');
        }
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Error al iniciar sesión. Verifica tus credenciales.', 'Error');
      }
    });
  }
}
