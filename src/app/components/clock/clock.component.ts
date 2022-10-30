import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnDestroy, OnInit {
  
  counter: number = 0;
  timerRef!: any;
  running: boolean = false;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.running = true;
      const startTime = Date.now();
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      }, 1000)
  }

  clearTimer() {
    this.running = false;
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  getTime() {
    return this.counter;
  }
}
