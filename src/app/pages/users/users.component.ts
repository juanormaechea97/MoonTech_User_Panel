import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe((res: any) => {
      this.users = res;
    });
  }

  editUser(user: any) {
    console.log('Editar usuario:', user);
    // Aquí puedes abrir un formulario modal o redirigir a una vista de edición
  }

  deleteUser(userId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.http.delete(`http://localhost:5000/api/users/${userId}`).subscribe(() => {
        console.log('Usuario eliminado:', userId);
        this.loadUsers(); // Recargar la lista después de eliminar
      });
    }
  }
}
