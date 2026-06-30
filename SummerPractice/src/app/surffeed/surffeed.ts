import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Header } from '../header/header';
import { Newpost } from '../newpost/newpost';
import { Post } from '../post/post';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-surffeed',
  imports: [RouterLink, Header, Newpost, Post],
  templateUrl: './surffeed.html',
  styleUrl: './surffeed.css',
})
export class Surffeed implements OnInit {
  posts: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get(this.baseUrl + '/NewsFeed').subscribe({
      next: (response: any) => {
        console.log('Посты получены:', response);
        this.posts = response.map((post: any) => ({
          id: post.id,
          username: post.author || 'Пользователь',
          avatar: post.authorPhoto 
            ? this.baseUrl + '/img/' + post.authorPhoto 
            : 'assets/avatar-placeholder.png',
          date: this.formatDate(post.publishDateTime),
          text: post.text || '',
          image: post.photo 
            ? this.baseUrl + '/img/' + post.photo 
            : '',
          likes: 0
        }));
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Ошибка загрузки постов:', error);
        this.errorMessage = 'Не удалось загрузить посты. Попробуйте позже.';
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} в ${hours}:${minutes}`;
  }
}