import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, // Protegida por AuthGuard
  { path: '**', redirectTo: 'login' } // Redirección por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // FormsModule NO debe estar aquí
  exports: [RouterModule]
})
export class AppRoutingModule {}
