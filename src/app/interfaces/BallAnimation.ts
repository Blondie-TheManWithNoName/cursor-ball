export interface BallAnimation {
  state: boolean;
  block?: boolean;
  prevSize: number;
  prevText: string;
  prevPos?: { x: number; y: number };
}
