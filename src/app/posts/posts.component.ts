import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { debounceTime, delay, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { PostDto } from '../postDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  fetchData: Post[] = [];
  displayedData: Post[] = [];
  postsPerPage: number = 10;
  allPages: number;
  loading: boolean = true;
  search: string = '';
  postDto: PostDto = new PostDto();
  form: FormGroup;
  showAdd: boolean = false;
  postsData$: Observable<Post[] | null>;
  createPostSubscription: Subscription;
  deletePostSuscription: Subscription;
  subscriptions = new Subscription();

  constructor(
    public postsService: PostsService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
    this.getPosts();
    this.subscriptions.add(this.createPostSubscription);
    this.subscriptions.add(this.deletePostSuscription);
  }

  ngAfterViewInit(): void {
    const search$: Observable<Event> = fromEvent(
      document.getElementById('id'),
      'input'
    );
    search$
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(1500),
        distinctUntilChanged()
      )
      .subscribe();
  }

  getPosts(): void {
    this.postsData$ = this.postsService.getPosts().pipe(delay(500));
    this.postsData$.subscribe((data) => {
      this.fetchData = data;
      this.onPageChange();
      this.allPages = Math.ceil(this.fetchData.length / this.postsPerPage);
      this.loading = false;
    });
  }

  createPost(): void {
    this.postDto.title = this.form.value.title;
    this.postDto.body = this.form.value.body;
    this.createPostSubscription = this.postsService.createPost(this.postDto).subscribe((res: PostDto) => {
      this.displayedData.push(res);
      let ref = document.getElementById('close');
      ref.click();
    });
  }

  deletePost(id: number): void {
    this.deletePostSuscription = this.postsService.deletePost(id).subscribe(() => {
      this.displayedData = this.displayedData.filter(
        (post: Post) => post.id !== id
      );
    });
  }

  onPageChange(page: number = 1): void {
    const startPage = (page - 1) * this.postsPerPage;
    const endPage = page * this.postsPerPage;
    this.displayedData = this.fetchData.slice(startPage, endPage);
  }

  showModal() {
    this.form.reset();
    this.showAdd = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
