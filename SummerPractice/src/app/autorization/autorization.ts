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
  password: string = '';

}