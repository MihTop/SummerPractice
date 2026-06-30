import { Component, Inject } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-autorization',
  imports: [Header, RouterLink, FormsModule],
  templateUrl: './autorization.html',
  styleUrl: './autorization.css',
})
export class Autorization {
  username: string = '';
  password: string = '';
  
  showErrors: boolean = false;
  showUsernameHint: boolean = false;
  
  usernameError: boolean = false;
  passwordError: boolean = false;
  passwordInvalidChars: boolean = false;
  generalError: boolean = false;
  loginError: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    private router: Router,
    private userService: UserService
  ) {}

  // Метод для проверки символов пароля при вводе
  checkPasswordChars() {
    const validPasswordPattern = /^[a-zA-Z0-9_]*$/;
    if (this.password && !validPasswordPattern.test(this.password)) {
      this.passwordInvalidChars = true;
    } else {
      this.passwordInvalidChars = false;
    }
  }

  onLogin() {
    // Сбрасываем ошибки перед проверкой
    this.usernameError = false;
    this.passwordError = false;
    this.passwordInvalidChars = false;
    this.generalError = false;
    this.loginError = false;
    
    // Проверяем на недопустимые символы в пароле
    const validPasswordPattern = /^[a-zA-Z0-9_]*$/;
    if (this.password && !validPasswordPattern.test(this.password)) {
      this.passwordInvalidChars = true;
      this.showErrors = true;
    }
    
    // Проверяем обязательные поля (только на пустоту)
    let hasEmptyField = false;
    
    if (!this.username || this.username.trim() === '') {
      this.usernameError = true;
      hasEmptyField = true;
    }
    
    if (!this.password || this.password.trim() === '') {
      this.passwordError = true;
      hasEmptyField = true;
    }
    
    // Проверка длины пароля (если пароль введен)
    if (this.password && (this.password.length < 3 || this.password.length > 20)) {
      this.passwordError = true;
    }
    
    // Если есть пустые поля - показываем generalError
    if (hasEmptyField) {
      this.showErrors = true;
      this.generalError = true;
      return;
    }
    
    // Если есть другие ошибки (символы или длина) - показываем их, но без generalError
    if (this.passwordInvalidChars || this.passwordError) {
      this.showErrors = true;
      return;
    }
    
    // Если ошибок нет - скрываем ошибки
    this.showErrors = false;
    this.generalError = false;

    // Отправка запроса на сервер
    const formData = new FormData();
    formData.append('Nickname', this.username);
    formData.append('Password', this.password);

    this.http.post(this.baseUrl + '/Login', formData).subscribe({
      next: (response: any) => {
        console.log('Вход успешен!', response);
        
        // Сохраняем данные пользователя
        const authData = window.btoa(this.username + ':' + this.password);
        const userInfo = {
          nickname: response.nickname || this.username,
          photo: response.image || '',
          authData: authData
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Уведомляем хедер об изменении
        this.userService.authChanged.emit();
        
        // Перенаправляем на главную
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Ошибка входа:', error);
        
        if (error.status === 400) {
          // Показываем ошибку "Неверный логин или пароль"
          this.loginError = true;
          this.showErrors = true;
        } else {
          this.showErrors = true;
          alert('Ошибка подключения к серверу. Попробуйте позже.');
        }
      }
    });
  }

  clearUsername() {
    this.username = '';
    this.usernameError = false;
    this.generalError = false;
    this.showErrors = false;
    this.loginError = false;
  }

  clearPassword() {
    this.password = '';
    this.passwordError = false;
    this.passwordInvalidChars = false;
    this.generalError = false;
    this.showErrors = false;
    this.loginError = false;
  }
}