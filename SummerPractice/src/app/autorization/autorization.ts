import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
}
clearUsername() {
    this.username = '';
    this.usernameError = false;
    this.generalError = false;
    this.showErrors = false;
}

clearPassword() {
    this.password = '';
    this.passwordError = false;
    this.passwordInvalidChars = false;
    this.generalError = false;
    this.showErrors = false;
}
}