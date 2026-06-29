import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  imports: [FormsModule],
  templateUrl: './newpost.html',
  styleUrl: './newpost.css',
})
export class Newpost {
  postText: string = '';
  imagePath: string = '';
  isFormValid: boolean = false;

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
    this.isFormValid = !!(this.postText?.trim() || this.imagePath);
  }
}