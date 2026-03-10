export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      color?: string
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      color? : string;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
      color? : string;
    } | {
      type: "eraser";
      points: {x: number, y: number}[];
      color?: string;
    } | {
      type: "clear"
      color?: string;
    } | {
      type: "text",
      x: number,
      y: number,
      text: string,
      color?: string;
    } | {
      type: "arrow",
      startX: number,
      startY : number,
      endX: number,
      endY: number,
      color?: string;
    };
