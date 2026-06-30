import { Component, Inject } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  imports: [Header, RouterLink, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
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
  avatarPreview: string = '';
  selectedFile: File | null = null;

  showErrors: boolean = false;
  generalError: boolean = false;
  nicknameError: boolean = false;
  nicknameTakenError: boolean = false;
  emailError: boolean = false;
  emailTakenError: boolean = false;
  passwordError: boolean = false;
  passwordInvalidChars: boolean = false;
  confirmPasswordError: boolean = false;
  passwordsMatchError: boolean = false;
  showNicknameHint: boolean = false;
  showPasswordHint: boolean = false;
  nicknameInvalidChars: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    private router: Router,
    private userService: UserService
  ) {}

  checkPasswordChars() {
    const validPasswordPattern = /^[a-zA-Z0-9_]*$/;
    if (this.password && !validPasswordPattern.test(this.password)) {
      this.passwordInvalidChars = true;
    } else {
      this.passwordInvalidChars = false;
    }
  }

  checkNicknameChars() {
    const validNicknamePattern = /^[a-zA-Zа-яА-Я0-9_]*$/;
    if (this.nickname && !validNicknamePattern.test(this.nickname)) {
      this.nicknameInvalidChars = true;
    } else {
      this.nicknameInvalidChars = false;
    }
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.photo = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister() {
    // Сброс ошибок
    this.nicknameError = false;
    this.nicknameTakenError = false;
    this.emailError = false;
    this.emailTakenError = false;
    this.passwordError = false;
    this.passwordInvalidChars = false;
    this.confirmPasswordError = false;
    this.passwordsMatchError = false;
    this.generalError = false;
    this.showErrors = false;
    this.nicknameInvalidChars = false;

    let hasError = false;

    // Валидация псевдонима
    const nicknamePattern = /^[a-zA-Zа-яА-Я0-9_]{3,20}$/;
    if (!this.nickname.trim()) {
      this.nicknameError = true;
      hasError = true;
    } else if (!nicknamePattern.test(this.nickname)) {
      this.nicknameError = true;
      hasError = true;
    }

    // Валидация email
    const emailPattern = /^[^\s@]+@[^\s@]+\.ru$/;
    if (!this.email.trim()) {
      this.emailError = true;
      hasError = true;
    } else if (!emailPattern.test(this.email)) {
      this.emailError = true;
      hasError = true;
    }

    // Валидация пароля
    const passwordPattern = /^[a-zA-Z0-9_]{6,20}$/;
    if (!this.password) {
      this.passwordError = true;
      hasError = true;
    } else if (!passwordPattern.test(this.password)) {
      this.passwordError = true;
      hasError = true;
    }

    // Валидация подтверждения пароля
    if (!this.confirmPassword) {
      this.confirmPasswordError = true;
      hasError = true;
    } else if (this.password !== this.confirmPassword) {
      this.passwordsMatchError = true;
      hasError = true;
    }

    if (hasError) {
      this.showErrors = true;
      this.generalError = true;
      return;
    }

    // Отправка запроса на сервер
    const formData = new FormData();
    formData.append('Nickname', this.nickname);
    formData.append('Email', this.email);
    formData.append('Password', this.password);
    formData.append('Surname', this.surname || '');
    formData.append('Name', this.name || '');
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }
    formData.append('Contacts', this.contact || '');
    formData.append('UserInfo', this.about || '');
    formData.append('Achievements', this.achievements || '');

    this.http.post(this.baseUrl + '/Register', formData).subscribe({
      next: (response: any) => {
        console.log('Регистрация успешна!', response);
        
        // Сохраняем данные пользователя
        const authData = window.btoa(this.nickname + ':' + this.password);
        const userInfo = {
          nickname: this.nickname,
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
        console.error('Ошибка регистрации:', error);
        
        if (error.status === 400) {
          const message = error.error?.message;
          
          if (message === 'Такой псевдоним уже занят') {
            this.nicknameTakenError = true;
            this.generalError = true;
          } else if (message === 'Такая почта уже зарегистрирована') {
            this.emailTakenError = true;
            this.generalError = true;
          } else if (message === 'Заполнены не все обязательные поля!') {
            this.generalError = true;
          } else {
            this.generalError = true;
            alert('Ошибка регистрации: ' + message);
          }
        } else {
          this.generalError = true;
          alert('Ошибка подключения к серверу. Попробуйте позже.');
        }
      }
    });
  }

  clearNickname() { 
    this.nickname = ''; 
    this.nicknameError = false; 
    this.nicknameTakenError = false; 
    this.generalError = false; 
    this.nicknameInvalidChars = false;
  }

  clearEmail() { 
    this.email = ''; 
    this.emailError = false; 
    this.emailTakenError = false; 
    this.generalError = false; 
  }

  clearPassword() { 
    this.password = ''; 
    this.passwordError = false; 
    this.passwordInvalidChars = false; 
    this.generalError = false; 
  }

  clearConfirmPassword() { 
    this.confirmPassword = ''; 
    this.confirmPasswordError = false; 
    this.passwordsMatchError = false; 
    this.generalError = false; 
  }

  clearSurname() { 
    this.surname = ''; 
  }

  clearName() { 
    this.name = ''; 
  }

  clearContact() { 
    this.contact = ''; 
  }

  clearAbout() { 
    this.about = ''; 
  }

  clearAchievements() { 
    this.achievements = ''; 
  }
}