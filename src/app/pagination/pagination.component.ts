import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
   selector: 'app-pagination',
   templateUrl: './pagination.component.html',
   styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

   @Input() allPagesNumber: number;
   @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
   private _currentPage = 1;

   constructor() {}

   get currentPage(): number {
      return this._currentPage;
   }

   set currentPage(page: number) {
      this._currentPage = page;
      this.changePage.emit(this.currentPage);
   }

   onStartPage(): void {
      this.currentPage = 1;
   }

   onPreviousPage(): void {
      this.currentPage -= 1;
   }

   onNextPage(): void {
      this.currentPage += 1;
   }

   onEndPage(): void {
      this.currentPage = this.allPagesNumber;
   }
}