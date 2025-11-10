import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-by-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-by-id.html',
})
export default class UserById implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public userForm: FormGroup;
  public roles = Object.values(Role);
  public isSubmitting = false;
  public isLoading = true;
  public userId: number = 0;

  constructor() {
    this.userForm = this.fb.group({
      id: [0],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: [Role.USER, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        this.isLoading = false;
        alert('Error al cargar el usuario');
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const userData = this.userForm.value;

      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          this.isSubmitting = false;
          alert('Error al actualizar el usuario');
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
