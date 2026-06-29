import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Header } from '../header/header';
import { Newpost } from '../newpost/newpost';
import { Post } from '../post/post';

@Component({
  selector: 'app-surffeed',
  imports: [RouterLink,Header,Newpost, Post],
  templateUrl: './surffeed.html',
  styleUrl: './surffeed.css',
})
export class Surffeed {
  posts = [
    {
      id: 1,
      username: 'Enotovod',
      avatar: 'avatar-placeholder.png',
      date: '13.06.2019 в 20:15',
      text: 'Sample text Sample text Sample text Sample text Sample text. Sample text Sample text Sample text, Sample text Sample text Sample text Sample text Sample text - Sample text Sample text Sample text. Sample text!!',
      image: '/post1.png',
      likes: 257
    },
    {
      id: 2,
      username: 'Kotik228',
      avatar: 'avatar-placeholder.png',
      date: '14.06.2019 в 14:30',
      text: 'Another sample post content. This is a test post to demonstrate the feed functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/post2.png',
      likes: 134
    },
    {
      id: 3,
      username: 'Sobaka1337',
      avatar: 'avatar-placeholder.png',
      date: '15.06.2019 в 09:45',
      text: 'Third post in the feed. Showing how multiple posts look in the layout. This post has a longer text to see how it wraps.',
      image: '/post3.png',
      likes: 89
    },
    {
      id: 4,
      username: 'HomyakPro',
      avatar: 'avatar-placeholder.png',
      date: '16.06.2019 в 18:20',
      text: 'Post number four. This is a great example of a social media post. Users can share their thoughts and images.',
      image: '/post4.png',
      likes: 312
    },
    {
      id: 5,
      username: 'Lisichka2020',
      avatar: 'avatar-placeholder.png',
      date: '17.06.2019 в 11:10',
      text: 'The fifth post in the feed. This demonstrates how the feed looks with multiple posts from different users.',
      image: '/post5.png',
      likes: 56
    }
  ];
}
