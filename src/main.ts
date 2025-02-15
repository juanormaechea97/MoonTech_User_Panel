import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes/app.routes';
import { provideToastr } from 'ngx-toastr';
import player from 'lottie-web';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // ✅ Ahora debe activarse el interceptor
    provideAnimations(),
    provideLottieOptions({
      player: () => player,
    }),
    provideToastr(),
  ]
}).catch(err => console.error(err));
