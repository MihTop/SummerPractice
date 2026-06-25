import { Routes } from '@angular/router';
import { Surffeed } from './surffeed/surffeed';
import { Registration } from './registration/registration';
import { Autorization } from './autorization/autorization';

export const routes: Routes = [
    { path: '', component: Surffeed },
    { path: 'login', component: Registration },
    { path: 'registration', component: Autorization } 
];
