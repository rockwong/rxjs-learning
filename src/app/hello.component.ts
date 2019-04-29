import { Component, Input } from '@angular/core';
import {Observable,interval,Subscription} from 'rxjs';
import { scan } from 'rxjs/operators'

@Component({
  selector: 'hello',
  template: `
            <button (click)="newSeq()">change</button>
            <ul>
              <li [style.background-color]="item.color" *ngFor="let item of items">{{item.num}}</li>
            </ul>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
  subscription:Subscription
  items =[];
  constructor(){
    this.newSeq()
  }
  newSeq(){
     if (this.subscription) {
      this.subscription.unsubscribe();
    }
    let color='#'+Math.random().toString(16).slice(-6);
    this.subscription=interval(1000).pipe(
      scan((acc,num)=>[{num,color},...acc].slice(0,5),[])
    ).subscribe(items=>this.items=items)
  }
}
