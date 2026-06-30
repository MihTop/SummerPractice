import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  nickname: string = "";
  photo: string = "";
  isAuthenticated: boolean = false;
  baseUrl: string;
  currentRoute: string = '';

  constructor(
    private userService: UserService, 
    @Inject("BASE_API_URL") baseUrl: string,
    private router: Router
  ){
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    // Получаем текущий маршрут
    this.currentRoute = this.router.url;
    
    // Подписываемся на изменения маршрута
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

    this.updateUserInfo();
    this.userService.authChanged.subscribe(() => this.updateUserInfo());
  }

  private updateUserInfo(){
    this.isAuthenticated = this.userService.isAuthenticated();
    if(this.isAuthenticated){
      const userInfo = this.userService.getUserInfo();
      this.nickname = userInfo.nickname;
      this.photo = userInfo.photo 
        ? this.baseUrl + '/img/' + userInfo.photo 
        : 'assets/avatar-placeholder.png';
    } else {
      this.nickname = "";
      this.photo = "";
    }
  }

  logout(){
    this.userService.logout();
  }
}