import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task, Status } from '../../../../interfaces/task.interface';
import { AsyncPipe, TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe, DatePipe],
  templateUrl: './task-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskList {
  private taskService = inject(TaskService);
  private router = inject(Router);

  public tasks$: Observable<Task[]> = this.taskService.getTasks();
  public isDeleting = signal<number | null>(null);

  onAddTask(): void{
    this.router.navigate(['/tasks/create-task']);
  }

  onEditTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  onDeleteTask(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta tarea?')) {
      this.isDeleting.set(id);
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks$ = this.taskService.getTasks();
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error al eliminar tarea:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar la tarea');
        }
      });
    }
  }

  onToggleComplete(task: Task): void {
    const updatedTask: Task = {
      ...task,
      status: task.status === Status.COMPLETADA ? Status.PENDIENTE : Status.COMPLETADA
    };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.tasks$ = this.taskService.getTasks();
      },
      error: (error) => {
        console.error('Error al actualizar tarea:', error);
      }
    });
  }

  getPriorityClass(priority: string): string {
    switch(priority) {
      case 'ALTA': return 'badge bg-danger';
      case 'MEDIA': return 'badge bg-warning';
      case 'BAJA': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'COMPLETADA': return 'badge bg-success';
      case 'EN_PROCESO': return 'badge bg-primary';
      case 'PENDIENTE': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}
