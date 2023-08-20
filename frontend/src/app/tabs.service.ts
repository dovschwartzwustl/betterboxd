// tab.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private activeTabIndexSubject = new BehaviorSubject<number>(0);
  activeTabIndex$ = this.activeTabIndexSubject.asObservable();

  setActiveTabIndex(index: number) {
    this.activeTabIndexSubject.next(index);
  }
}
