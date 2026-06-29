import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  @Input() username: string = 'Enotovod';
  @Input() avatar: string = 'avatar-placeholder.png';
  @Input() date: string = '13.06.2019 в 20:15';
  @Input() text: string = 'Sample text Sample text Sample text Sample text Sample text. Sample text Sample text Sample text, Sample text Sample text Sample text Sample text Sample text - Sample text Sample text Sample text. Sample text!!';
  @Input() image: string = 'post-image-placeholder.png';
  @Input() likes: number = 257;
}
