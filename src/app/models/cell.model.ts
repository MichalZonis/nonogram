import { states } from "./states.enum";

export class Cell {
  state: states;


  constructor () {
    this.state = states.undecided;
  }

  isBlackened (): boolean {
    return (this.state == states.black)
  }

  isEmpty (): boolean {
    return (this.state == states.empty)
  }
  setNextState(disableEmptyState: boolean) : void {
    var indexOfNextState = (Object.values(states).indexOf(this.state) + 1) % 3;
    this.state = Object.values(states)[indexOfNextState]

    if(disableEmptyState && this.isEmpty()) {
      this.setNextState(disableEmptyState);
    }
  }

  setState(newState: states) : void {
    this.state = newState;
  }

};


