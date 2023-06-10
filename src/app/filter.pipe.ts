import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(posts: Post[], search: string): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
