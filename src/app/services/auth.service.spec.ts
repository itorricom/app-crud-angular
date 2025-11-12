import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, Role } from '../interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with correct credentials', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        fullname: 'Test User',
        username: 'testuser',
        password: 'testpass',
        role: Role.USER
      }
    ];

    const expectedUser = mockUsers[0];

    service.login('testuser', 'testpass').subscribe(user => {
      expect(user).toEqual(expectedUser);
      expect(service.currentUserValue).toEqual(expectedUser);
      expect(localStorage.getItem('currentUser')).toBeTruthy();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fail login with incorrect credentials', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        fullname: 'Test User',
        username: 'testuser',
        password: 'testpass',
        role: Role.USER
      }
    ];

    service.login('wronguser', 'wrongpass').subscribe(
      () => fail('should have failed'),
      error => {
        expect(error.message).toContain('Username or password is incorrect');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(mockUsers);
  });

  it('should logout and clear user data', () => {
    const mockUser: User = {
      id: 1,
      fullname: 'Test User',
      username: 'testuser',
      password: 'testpass',
      role: Role.USER
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    
    service.logout();

    expect(service.currentUserValue).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should return true for admin user', () => {
    const adminUser: User = {
      id: 1,
      fullname: 'Admin User',
      username: 'admin',
      password: 'admin123',
      role: Role.ADMIN
    };

    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    service = new AuthService(TestBed.inject(HttpClientTestingModule) as any);

    expect(service.isAdmin()).toBe(true);
  });

  it('should return false for non-admin user', () => {
    const normalUser: User = {
      id: 2,
      fullname: 'Normal User',
      username: 'user',
      password: 'user123',
      role: Role.USER
    };

    localStorage.setItem('currentUser', JSON.stringify(normalUser));
    service = new AuthService(TestBed.inject(HttpClientTestingModule) as any);

    expect(service.isAdmin()).toBe(false);
  });

  it('should persist user in localStorage on login', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        fullname: 'Test User',
        username: 'testuser',
        password: 'testpass',
        role: Role.USER
      }
    ];

    service.login('testuser', 'testpass').subscribe(user => {
      const storedUser = localStorage.getItem('currentUser');
      expect(storedUser).toBeTruthy();
      expect(JSON.parse(storedUser!)).toEqual(mockUsers[0]);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(mockUsers);
  });
});
