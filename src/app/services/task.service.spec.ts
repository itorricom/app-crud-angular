import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task, Priority, Status } from '../interfaces/task.interface';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tasks', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        priority: Priority.ALTA,
        status: Status.PENDIENTE,
        dueDate: '2025-11-10',
        createdBy: 'test'
      }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should get task by id', () => {
    const mockTask: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      priority: Priority.ALTA,
      status: Status.PENDIENTE,
      dueDate: '2025-11-10',
      createdBy: 'test'
    };

    service.getTaskById(1).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should create task', () => {
    const newTask: Task = {
      id: 2,
      title: 'New Task',
      description: 'New Description',
      priority: Priority.MEDIA,
      status: Status.PENDIENTE,
      dueDate: '2025-11-11',
      createdBy: 'test'
    };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update task', () => {
    const updatedTask: Task = {
      id: 1,
      title: 'Updated Task',
      description: 'Updated Description',
      priority: Priority.BAJA,
      status: Status.COMPLETADA,
      dueDate: '2025-11-12',
      createdBy: 'test'
    };

    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete task', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
