import { HttpClient } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";

export interface UserInfo {
    nickname: string;
    photo : string;
    authData: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService{

    @Output() errors: EventEmitter<any> = new EventEmitter();

    @Output() authChanged: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string, private router: Router) { }


    login(nickname: string, password: string, rememberMe: boolean){
        const formData = new FormData();

        formData.append('login',nickname);
        formData.append('password',password);

        const storage = rememberMe ? localStorage : sessionStorage;
        this.http.post(this.baseUrl + '/Login',formData).subscribe({
            next: (user: any) => {
                const authData = window.btoa(nickname + ':' + password)
                const userInfo: UserInfo = {nickname: nickname, photo: user.photo, authData: authData};
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                localStorage.setItem('isAuthenticated', 'true');

                this.authChanged.emit();

                this.router.navigate([''])
            },
            error: (e?) => {
                this.errors.emit(e);
            }
        })
    }


    logout(){
        localStorage.removeItem('userInfo')
        localStorage.removeItem('isAuthenticated')

        this.authChanged.emit();

        this.router.navigate([''])
    }

    isAuthenticated(): boolean{
        const isAuthenticatedLocal = localStorage.getItem('isAuthenticated') == 'true';
        const isAuthenticatedSession = sessionStorage.getItem('isAuthenticated') == 'true';
        return isAuthenticatedLocal || isAuthenticatedSession
    }

    getUserInfo(): UserInfo{
        let user = JSON.parse(localStorage.getItem('userInfo')!) as UserInfo;

        return user
    }
}