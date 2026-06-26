import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [Header, RouterLink, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  // Поля формы
  nickname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  surname: string = '';
  name: string = '';
  photo: string = '';
  contact: string = '';
  about: string = '';
  achievements: string = '';

  // Состояния ошибок
  showErrors: boolean = false;
  nicknameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;
  passwordsMatchError: boolean = false;

  onRegister() {
    this.showErrors = true;
    let hasError = false;

    // Проверка псевдонима
    if (!this.nickname.trim()) {
      this.nicknameError = true;
      hasError = true;
    } else {
      this.nicknameError = false;
    }

    // Проверка почты
    if (!this.email.trim()) {
      this.emailError = true;
      hasError = true;
    } else {
      this.emailError = false;
    }

    // Проверка пароля
    if (!this.password || this.password.length < 3 || this.password.length > 20) {
      this.passwordError = true;
      hasError = true;
    } else {
      this.passwordError = false;
    }

    // Проверка подтверждения пароля
    if (!this.confirmPassword) {
      this.confirmPasswordError = true;
      this.passwordsMatchError = false;
      hasError = true;
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = false;
      this.passwordsMatchError = true;
      hasError = true;
    } else {
      this.confirmPasswordError = false;
      this.passwordsMatchError = false;
    }

    if (!hasError) {
      // Здесь логика регистрации
      console.log('Регистрация успешна');
    }
  }
}