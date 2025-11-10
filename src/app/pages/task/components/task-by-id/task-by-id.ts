import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority, Status } from '../../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-by-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-by-id.html',
})
export default class TaskById implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public taskForm: FormGroup;
  public priorities = Object.values(Priority);
  public statuses = Object.values(Status);
  public isSubmitting = false;
  public isLoading = true;
  public taskId: number = 0;

  constructor() {
    this.taskForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: [Priority.MEDIA, [Validators.required]],
      status: [Status.PENDIENTE, [Validators.required]],
      dueDate: ['', [Validators.required]],
      createdBy: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.loadTask();
    });
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar tarea:', error);
        this.isLoading = false;
        alert('Error al cargar la tarea');
        this.router.navigate(['/tasks']);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      const taskData = this.taskForm.value;

      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error al actualizar tarea:', error);
          this.isSubmitting = false;
          alert('Error al actualizar la tarea');
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
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
