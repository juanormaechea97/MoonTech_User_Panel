import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes/app.routes';
import { provideToastr } from 'ngx-toastr'; // ✅ Importar Toastr
import player from 'lottie-web'; // ✅ Importación correcta

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideLottieOptions({
      player: () => player, // ✅ Configuración necesaria para Lottie
    }),
    provideAnimations(), // ✅ Necesario para las animaciones de Toastr
    provideToastr(), // ✅ Proveer Toastr en la app
  ]
}).catch(err => console.error(err));
