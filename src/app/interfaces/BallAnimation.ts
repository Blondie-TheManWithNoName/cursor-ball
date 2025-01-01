export interface BallAnimation {
  state: boolean;
  block?: boolean;
  prevSize: number;
  prevText: string;
  prevPos?: { x: number; y: number };
}

export interface BallAnimationProps {
  size?: number;
  duration: number;
  pos?: { x: number; y: number };
  text?: string;
}
