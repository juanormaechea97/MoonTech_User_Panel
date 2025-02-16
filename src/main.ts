import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes/app.routes';
import { tokenInterceptor } from './app/interceptors/token.interceptor'; // ✅ Ahora usamos la función

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])), // ✅ Ahora sí funciona correctamente
    provideAnimations(),
    provideToastr(),
    provideLottieOptions({ player: () => player }),
  ]
}).catch(err => console.error(err));
