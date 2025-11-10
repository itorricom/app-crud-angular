import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserCreate {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  public userForm: FormGroup;
  public roles = Object.values(Role);
  public isSubmitting = false;

  constructor() {
    this.userForm = this.fb.group({
      id: [0],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: [Role.USER, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      // Auto-incrementar ID
      this.userService.getUsers().subscribe({
        next: (users) => {
          const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
          const userData = { ...this.userForm.value, id: newId };
          
          this.userService.createUser(userData).subscribe({
            next: () => {
              this.isSubmitting = false;
              this.router.navigate(['/users']);
            },
            error: (error) => {
              console.error('Error al crear usuario:', error);
              this.isSubmitting = false;
              alert('Error al crear el usuario');
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener usuarios:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.controls[key].markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
