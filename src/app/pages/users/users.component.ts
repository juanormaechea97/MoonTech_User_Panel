import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔹 Agregar esta importación

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  lastLogin?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // 🔹 Agregar FormsModule aquí
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  editing: boolean = false; // Para alternar entre vista y edición

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token'); // 🔹 Obtener el token almacenado
  
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
  
    this.http.get<User[]>('http://localhost:5001/api/users', {
      headers: { Authorization: `Bearer ${token}` } // ✅ Enviar token en la petición
    }).subscribe({
      next: (res) => {
        this.users = res;
        if (res.length > 0) {
          this.selectedUser = res[0]; // ✅ Selecciona el primer usuario
        }
      },
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  toggleUserStatus(user: User) {
    const updatedUser = { ...user, active: !user.active };
    const token = localStorage.getItem('token'); // 🔹 Obtener el token almacenado
  
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
  
    console.log('ID antes de enviar la petición:', user._id);
    console.log('Enviando actualización:', updatedUser);
  
    this.http.put<User>(`http://localhost:5001/api/users/${user._id}`, updatedUser, {
      headers: { Authorization: `Bearer ${token}` } // ✅ Enviar token en la petición
    }).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        user.active = res.active;
      },
      error: (err) => console.error('Error al actualizar estado del usuario:', err)
    });
  }
  
  

  selectUser(user: User) {
    this.selectedUser = user;
    this.editing = false;
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.editing = true;
  }

  saveUser() {
    if (this.selectedUser) {
      this.http.put(`http://localhost:5001/api/users/${this.selectedUser._id}`, this.selectedUser)
        .subscribe(() => {
          console.log('Usuario actualizado');
          this.editing = false;
        });
    }
  }

  deleteUser(userId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.http.delete(`http://localhost:5001/api/users/${userId}`).subscribe(() => {
        console.log('Usuario eliminado:', userId);
        this.loadUsers();
        if (this.selectedUser?._id === userId) {
          this.selectedUser = null;
        }
      });
    }
  }

  getInitials(name: string): string {
    const words = name.trim().split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0][0].toUpperCase();
  }
}
