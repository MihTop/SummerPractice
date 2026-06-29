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
      this.photo = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister() {
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

    const nicknamePattern = /^[a-zA-Zа-яА-Я0-9_]{3,20}$/;
    if (!this.nickname.trim()) {
      this.nicknameError = true;
      hasError = true;
    } else if (!nicknamePattern.test(this.nickname)) {
      this.nicknameError = true;
      hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.ru$/;
    if (!this.email.trim()) {
      this.emailError = true;
      hasError = true;
    } else if (!emailPattern.test(this.email)) {
      this.emailError = true;
      hasError = true;
    }

    const passwordPattern = /^[a-zA-Z0-9_]{6,20}$/;
    if (!this.password) {
      this.passwordError = true;
      hasError = true;
    } else if (!passwordPattern.test(this.password)) {
      this.passwordError = true;
      hasError = true;
    }

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

  }
  
  clearNickname() { this.nickname = ''; this.nicknameError = false; this.nicknameTakenError = false; this.generalError = false; this.nicknameInvalidChars = false;}
  clearEmail() { this.email = ''; this.emailError = false; this.emailTakenError = false; this.generalError = false; }
  clearPassword() { this.password = ''; this.passwordError = false; this.passwordInvalidChars = false; this.generalError = false; }
  clearConfirmPassword() { this.confirmPassword = ''; this.confirmPasswordError = false; this.passwordsMatchError = false; this.generalError = false; }
  clearSurname() { this.surname = ''; }
  clearName() { this.name = ''; }
  clearContact() { this.contact = ''; }
  clearAbout() { this.about = ''; }
  clearAchievements() { this.achievements = ''; }
}