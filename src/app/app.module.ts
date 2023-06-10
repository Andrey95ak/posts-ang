import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostsService } from './posts.service';
import { PostsComponent } from './posts/posts.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterPipe } from './filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';


const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'post/:postId', component: PostDetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PaginationComponent,
    PostDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
