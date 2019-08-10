export interface State {
  matrix: number[][];
  positionX: number;
  positionY: number;
  element: any;
  elementNumber: number;
  points: number;
  isFinished: boolean;
  board: string[];
}

export interface Key {
  code: string;
}