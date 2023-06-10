import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from '../comment';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  id: number;
  post: Post | undefined;
  comments: Comment[] = [];
  comment: Comment;
  subsIdPost: Subscription;
  subsCommentPost: Subscription;
  subscrioptions = new Subscription();

  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInfoAboutPost();
    this.getCommentsByIdPost();
    this.subscrioptions.add(this.subsIdPost);
    this.subscrioptions.add(this.subsCommentPost);
  }

  getInfoAboutPost(): void {
    this.id = this.route.snapshot.params['postId'];

    this.subsIdPost = this.postsService
      .viewPost(this.id)
      .subscribe((data: Post) => {
        this.post = data;
      });
  }

  getCommentsByIdPost() {
    this.id = this.route.snapshot.params['postId'];

    this.subsCommentPost = this.postsService
      .getCommentsById(this.id)
      .subscribe((res: any) => {
        this.comments = res;
      });
  }

  ngOnDestroy(): void {
    this.subscrioptions.unsubscribe();
  }
}
