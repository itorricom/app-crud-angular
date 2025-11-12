import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { Router } from '@angular/router';
import { Priority, Status } from '../../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskCreate {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public taskForm: FormGroup;
  public priorities = Object.values(Priority);
  public statuses = Object.values(Status);
  public isSubmitting = false;

  constructor() {
    this.taskForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: [Priority.MEDIA, [Validators.required]],
      status: [Status.PENDIENTE, [Validators.required]],
      dueDate: ['', [Validators.required]],
      createdBy: [this.authService.currentUserValue?.username || 'unknown']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      
      // obtener id para la nueva tarea
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
          const taskData = { ...this.taskForm.value, id: newId };
          
          this.taskService.createTask(taskData).subscribe({
            next: () => {
              this.isSubmitting = false;
              this.router.navigate(['/tasks']);
            },
            error: (err) => {
              console.error('Error creando:', err);
              this.isSubmitting = false;
              alert('No se pudo crear la tarea');
            }
          });
        },
        error: (err) => {
          console.error('Error:', err);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.controls[key].markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo requerido';
    }
    if (field?.hasError('minlength')) {
      return `Minimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
