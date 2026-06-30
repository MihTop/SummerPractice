import { Component, Inject, EventEmitter, Output } from '@angular/core';
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
  @Output() postCreated = new EventEmitter<void>();

  postText: string = '';
  imagePath: string = '';
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
      this.imagePath = file.name;
      this.checkFormValidity();
    }
  }

  checkFormValidity() {
    this.isFormValid = !!(this.postText?.trim());
  }

  onSubmit() {
    if (!this.postText?.trim()) {
      this.errorMessage = 'Заполните текст';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const userId = 1;

    const formData = new FormData();
    formData.append('Text', this.postText || '');
    formData.append('UserId', userId.toString());

    this.http.post(this.baseUrl + '/NewsFeed', formData).subscribe({
      next: (response: any) => {
        console.log('Пост создан:', response);
        this.isSubmitting = false;
        
        this.postText = '';
        this.imagePath = '';
        this.isFormValid = false;
        this.errorMessage = '';

        this.postCreated.emit();
      },
      error: (error: any) => {
        console.error('Ошибка:', error);
        this.isSubmitting = false;
        this.errorMessage = 'Ошибка создания поста';
      }
    });
  }
}