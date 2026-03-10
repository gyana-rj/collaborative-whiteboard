export type Shape =
  | {
      id: string;
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      color?: string
    }
  | {
      id: string;
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      color? : string;
    }
  | {
      id: string;
      type: "pencil";
      points: { x: number; y: number }[];
      color? : string;
    } | {
      id: string;
      type: "eraser";
      points: {x: number, y: number}[];
      color?: string;
    } | {
      id: string;
      type: "clear"
      color?: string;
    } | {
      id: string;
      type: "text",
      x: number,
      y: number,
      text: string,
      color?: string;
    } | {
      id: string;
      type: "arrow",
      startX: number,
      startY : number,
      endX: number,
      endY: number,
      color?: string;
    };
