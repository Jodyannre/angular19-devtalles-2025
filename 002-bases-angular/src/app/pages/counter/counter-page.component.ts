import { ChangeDetectionStrategy, Component, signal } from "@angular/core"



@Component({  selector: "app-counter-page",
  templateUrl: "./counter-page.component.html",
  styleUrls: ["./counter-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
  counter: number = 12;
  counterSignal = signal(12);

  counterBy1 = (value:number) => {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  resetCounter = () => {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
