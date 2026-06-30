import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newpost',
  imports: [FormsModule],
  templateUrl: './newpost.html',
  styleUrl: './newpost.css',
})
export class Newpost {
  postText: string = '';
  imagePath: string = '';
  selectedFile: File | null = null;
  isFormValid: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    private userService: UserService
  ) {}

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
      this.imagePath = file.name;
      this.checkFormValidity();
      this.errorMessage = '';
    }
  }

  checkFormValidity() {
    this.isFormValid = !!(this.postText?.trim() || this.selectedFile);
  }

  clearText() {
    this.postText = '';
    this.checkFormValidity();
    this.errorMessage = '';
  }

  clearImage() {
    this.selectedFile = null;
    this.imagePath = '';
    this.checkFormValidity();
    this.errorMessage = '';
    // Сбрасываем input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    // Проверка авторизации
    if (!this.userService.isAuthenticated()) {
      this.errorMessage = 'Необходимо авторизоваться для создания поста';
      return;
    }

    // Проверка: текст или фото должны быть заполнены
    if (!this.postText?.trim() && !this.selectedFile) {
      this.errorMessage = 'Заполните текст или добавьте изображение';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const userInfo = this.userService.getUserInfo();
    let userId = 1;

    const formData = new FormData();
    formData.append('Text', this.postText || '');
    formData.append('UserId', userId.toString());
    if (this.selectedFile) {
      formData.append('Photo', this.selectedFile);
    }

    this.http.post(this.baseUrl + '/NewsFeed', formData).subscribe({
      next: (response: any) => {
        console.log('Пост создан:', response);
        this.isSubmitting = false;
        
        // Очищаем форму
        this.postText = '';
        this.selectedFile = null;
        this.imagePath = '';
        this.isFormValid = false;
        this.errorMessage = '';
        
        // Сбрасываем input file
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }

        // Обновляем ленту (перезагружаем страницу или вызываем обновление)
        window.location.reload();
      },
      error: (error: any) => {
        console.error('Ошибка создания поста:', error);
        this.isSubmitting = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Необходимо авторизоваться';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Ошибка валидации';
        } else {
          this.errorMessage = 'Ошибка подключения к серверу';
        }
      }
    });
  }
}