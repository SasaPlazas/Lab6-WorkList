
import { Action } from './Actions';

export class Dispatcher {
  private _listeners: Array<(action: Action) => void> = [];

  register(callback: (action: Action) => void): void {
    this._listeners.push(callback);
  }

  dispatch(action: Action): void {
    for (const listener of this._listeners) {
      listener(action);
    }
  }
}

export const AppDispatcher = new Dispatcher();
