import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { PostDto } from './postDto';

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  createPost(data: PostDto): Observable<PostDto> {
    return this.httpClient.post<PostDto>(
      'https://jsonplaceholder.typicode.com/posts',
      data
    );
  }

  deletePost(id: number): Observable<Post> {
    return this.httpClient.delete<Post>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  viewPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
  }

  getCommentsById(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
  }
}
