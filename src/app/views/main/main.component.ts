import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil, timer} from "rxjs";
import {NgbAccordionModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>

  private destroy$ = new Subject<void>();
  constructor(private modalService : NgbModal,private accordionService: NgbAccordionModule) {

  }


  ngOnInit(): void {
    window.addEventListener('beforeunload', ()=> {
      sessionStorage.removeItem('isVisited');
    });
  }
  ngAfterViewInit():void {

    const isVisited = sessionStorage.getItem('isVisited');
    if(!isVisited){
      timer(10000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.modalService.open(this.popup, { centered: true });
          sessionStorage.setItem('isVisited', 'true');
        });
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('beforeunload', ()=> {
      sessionStorage.removeItem('isVisited');
    });

      this.modalService.dismissAll();
  }
}
