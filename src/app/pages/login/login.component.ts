import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie'; // ✅ Importación correcta
import animationData from '../../../assets/lottie/moonAnimation.json';
import cloudsAnimation from '../../../assets/lottie/clouds.json';


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

  constructor(private authService: AuthService, private router: Router) {}

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
