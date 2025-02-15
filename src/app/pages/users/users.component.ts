import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr'; // 🔹 Importar Toastr
import * as bootstrap from 'bootstrap'; // ✅ Importar Bootstrap para manejar el modal


interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  lastname?: string;
  lastLogin?: string;
  avatarColor?: string; // 🔹 Nuevo campo para el color del avatar
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  editing: boolean = false; 
  loading: boolean = false; // 🔹 Estado de carga
  errorMessage: string = ''; // 🔹 Manejo de errores

newUser = {
  name: '',
  email: '',
  password: '', 
  lastname: '',
  active: true
};

  constructor(private http: HttpClient, private toastr: ToastrService, ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

 
  // ✅ Alternar estado activo/inactivo con Toastr
  loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }

    this.http.get<User[]>('http://localhost:5001/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        // 🔹 Asignar un color aleatorio a cada usuario
        this.users = res.map(user => ({
          ...user,
          avatarColor: this.getRandomColor()
        }));
      },
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  // 🔹 Generar un color aleatorio en formato hexadecimal
  getRandomColor(): string {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }

 
  
  toggleUserStatus(user: User) {
    this.loading = true;
    const updatedUser = { ...user, active: !user.active };
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.toastr.error('No hay token de autenticación.', 'Error');
      this.loading = false;
      return;
    }
  
    console.log('🟡 Enviando actualización:', updatedUser); // 🔹 Verifica qué datos se envían
  
    this.http.put<User>(`http://localhost:5001/api/users/${user._id}`, updatedUser, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        console.log('✅ Usuario actualizado:', res); // 🔹 Verifica la respuesta de la API
        user.active = res.active;
        this.loading = false;
        this.toastr.success(
          `Usuario ${res.active ? 'activado' : 'desactivado'} correctamente.`,
          'Éxito'
        );
      },
      error: (err) => {
        console.error('❌ Error al actualizar usuario:', err);
        this.loading = false;
        this.toastr.error('No se pudo actualizar el usuario.', 'Error');
      }
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

  // ✅ Guardar usuario con mensaje de éxito/error
  saveUser() {
    if (!this.selectedUser) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No hay token de autenticación.', 'Error');
      return;
    }

    this.http.put(`http://localhost:5001/api/users/${this.selectedUser._id}`, this.selectedUser, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente.', 'Éxito');
        this.editing = false;
      },
      error: () => {
        this.toastr.error('No se pudo actualizar el usuario.', 'Error');
      }
    });
  }

  // ✅ Eliminar usuario con confirmación y Toastr
  deleteUser(userId: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('No hay token de autenticación.', 'Error');
      return;
    }

    this.http.delete(`http://localhost:5001/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.toastr.success('Usuario eliminado correctamente.', 'Éxito');
        this.loadUsers();
        if (this.selectedUser?._id === userId) {
          this.selectedUser = null;
        }
      },
      error: () => {
        this.toastr.error('No se pudo eliminar el usuario.', 'Error');
      }
    });
  }

  getInitials(name: string): string {
    const words = name.trim().split(' ');
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0][0].toUpperCase();
  }

  createUser() {
    // ✅ Verificar que los campos no estén vacíos
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      this.toastr.warning('Todos los campos son obligatorios.', 'Atención');
      return;
    }
  
    // ✅ Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newUser.email)) {
      this.toastr.warning('Ingrese un email válido.', 'Atención');
      return;
    }
  
    // ✅ Validar que la contraseña tenga al menos 6 caracteres
    if (this.newUser.password.length < 6) {
      this.toastr.warning('La contraseña debe tener al menos 6 caracteres.', 'Atención');
      return;
    }
  
    this.loading = true;
    const token = localStorage.getItem('token');
  
    // ✅ Verificar si hay un token de autenticación
    if (!token) {
      this.toastr.error('No hay token de autenticación.', 'Error');
      this.loading = false;
      return;
    }
  
    // ✅ Enviar solicitud al backend
    this.http.post<User>('http://localhost:5001/api/users', this.newUser, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.toastr.success('Usuario creado correctamente.', 'Éxito');
        this.loadUsers();
  
        // ✅ Limpiar formulario solo si el usuario se creó con éxito
        this.newUser = { name: '', email: '', password: '',lastname: '',  active: true };
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
  
        // ✅ Manejar errores según el código de respuesta
        if (err.status === 400) {
          this.toastr.error('El email ya está registrado.', 'Error');
        } else if (err.status === 500) {
          this.toastr.error('Error interno del servidor. Inténtelo de nuevo.', 'Error');
        } else {
          this.toastr.error('No se pudo crear el usuario.', 'Error');
        }
      },
      complete: () => this.loading = false
    });
  }
  
  
  
}
