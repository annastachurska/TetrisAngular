import { Subscription, Observable } from 'rxjs';

export interface State {
  matrix: number[][];
  positionX: number;
  positionY: number;
  element: any;
  elementNumber: number;
  points: number;
  isFinished: boolean;
  board: string[];
  gameInterval: Observable<number>;
  gameCounterSubscription: Subscription;
  isSwitchedSideKeys: boolean;
  isRotateBtnClicked: boolean;
  slowDownTimesToUse: number;
}

export interface Key {
  code: string;
}