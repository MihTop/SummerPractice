import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Header } from '../header/header';

@Component({
  selector: 'app-surffeed',
  imports: [RouterLink,Header],
  templateUrl: './surffeed.html',
  styleUrl: './surffeed.css',
})
export class Surffeed {}
