import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httprequest = inject(HttpClient);
  public url: string = 'http://localhost:3000/tasks';

  // obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.httprequest.get<Task[]>(this.url);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httprequest.get<Task>(`${this.url}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.httprequest.post<Task>(this.url, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.httprequest.put<Task>(`${this.url}/${id}`, task);
  }

  deleteTask(id: number): Observable<void>{
    return this.httprequest.delete<void>(`${this.url}/${id}`);
  }
}
