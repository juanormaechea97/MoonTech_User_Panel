import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>', // ✅ Muestra las páginas según la ruta
  standalone: true,
  imports: [RouterModule] // ✅ Importamos RouterModule para que funcione <router-outlet>
})
export class AppComponent {}
