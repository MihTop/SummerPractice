import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../header/header';
import { Newpost } from '../newpost/newpost';
import { Post } from '../post/post';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-surffeed',
  imports: [Header, Newpost, Post],
  templateUrl: './surffeed.html',
  styleUrl: './surffeed.css',
})
export class Surffeed implements OnInit {
  posts: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get(this.baseUrl + '/NewsFeed').subscribe({
      next: (response: any) => {
        this.posts = response;
        console.log('Посты:', this.posts);
        this.cdr.detectChanges(); // Принудительно обновляем представление
      },
      error: (error: any) => {
        console.error('Ошибка:', error);
      }
    });
  }
}