import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private subject = new Subject<any>();
  private confirmSubject = new Subject<any>();


  constructor() { }
  confirmThis(message: string): any {
    this.subject.next({
          type: 'confirm',
          text: message});
  }
  confirmDelete() {
    this.confirmSubject.next('confirm');
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  getConfirmMessage(): Observable<any> {
    return this.confirmSubject.asObservable();
  }
}
