import { Tool } from "@/app/components/Canvas";
import { getExistingShapes } from "./http";
import { Shape } from "./ShapeType";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private roomId: number;
  private startX = 0;
  private startY = 0;
  socket: WebSocket;
  private clicked: boolean;
  private selectedTool: Tool = "circle";
  private typing: boolean = false;

  private currentPath : {x: number, y: number}[] = [];

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandler();
    this.initMouseHandlers();
  }

  destroy(){
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  private async init() {
    try{
      this.existingShapes = await getExistingShapes(this.roomId);
      this.clearCanvas();
    }catch(error){
      console.error("Failed to fetch existing shapes", error);
    }
  }

  initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedData = JSON.parse(message.message);
        const incomingShape = parsedData.shape;

        if(incomingShape.type === "clear"){
          this.existingShapes = [];
          this.clearCanvas();
          return;
        }


        const alreadyExists = this.existingShapes.some(
          (shape) => JSON.stringify(shape) === JSON.stringify(incomingShape)
        );
        if(!alreadyExists){
          this.existingShapes.push(incomingShape);
        }
        this.clearCanvas();
      }
    };
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "white";
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          Math.PI * 2,
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }else if(shape.type === "pencil" || shape.type === "eraser"){
        this.ctx.strokeStyle = shape.type === "eraser" ? "black" : "white";
        this.ctx.lineWidth = shape.type === "eraser" ? 20 : 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        if (shape.points.length > 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
          for (let i = 1; i < shape.points.length; i++) {
            this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
          }
          this.ctx.stroke();
          this.ctx.closePath();
        }
        this.ctx.lineWidth = 1;
      }else if(shape.type === "text"){
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(shape.text, shape.x, shape.y);
      }else if(shape.type === "arrow"){
        const headlen = 15;
        const dx = shape.endX - shape.startX;
        const dy = shape.endY - shape.startY;
        const angle = Math.atan2(dy, dx);

        this.ctx.beginPath(); 
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);

        this.ctx.lineTo(
          shape.endX - headlen * Math.cos(angle - Math.PI / 6),
          shape.endY - headlen * Math.sin(angle - Math.PI / 6)
        );

        this.ctx.moveTo(shape.endX, shape.endY);
        this.ctx.lineTo(
          shape.endX - headlen * Math.cos(angle + Math.PI / 6),
          shape.endY - headlen * Math.sin(angle + Math.PI / 6)
        );

        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  clearAll(){
    this.existingShapes = [];
    this.clearCanvas();

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message : JSON.stringify({
          shape: {type: "clear"}
        }),
        roomId: this.roomId
      })
    )
  }

  mouseDownHandler = (e: MouseEvent) => {
    if(this.typing) return;

    if(this.selectedTool === "text"){
      this.addTextInput(e.offsetX, e.offsetY, e.clientX, e.clientY);
      return;
    }
    this.clicked = true;
    this.startX = e.offsetX;
    this.startY = e.offsetY;

    if(this.selectedTool === "pencil" || this.selectedTool === "eraser"){
      this.currentPath = [{x : e.offsetX, y: e.offsetY}];
    }
  }

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.offsetX - this.startX;
    const height = e.offsetY - this.startY;
    const selectedTool = this.selectedTool;
    let shape: Shape | null = null;

    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }else if (selectedTool === "pencil" || selectedTool === "eraser"){
      if(this.currentPath.length > 1){
        shape = { type: selectedTool, points: [...this.currentPath] };
      }
      this.currentPath = [];
    }else if(selectedTool === "arrow"){
      shape= {
        type: "arrow",
        startX: this.startX,
        startY: this.startY,
        endX: e.offsetX,
        endY: e.offsetY
      }
    }

    if (!shape) {
      return;
    }

    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      }),
    );
  }

  mouseMoveHandler = (e: MouseEvent) => {
    if(!this.clicked) return;
    
    if(this.selectedTool === "pencil" || this.selectedTool === "eraser"){
      this.currentPath.push({x: e.offsetX, y: e.offsetY});

      this.clearCanvas();
      this.ctx.strokeStyle = this.selectedTool === "eraser" ? "black" : "white";
      this.ctx.lineWidth = this.selectedTool === "eraser" ? 20 : 2;

      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";

      this.ctx.beginPath();
      const p = this.currentPath;
      this.ctx.moveTo(p[0].x, p[0].y);
      for(let i = 0; i < p.length; i++){
        this.ctx.lineTo(p[i].x, p[i].y);
      }
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.lineWidth = 1;

      return;
    }

    const width = e.offsetX - this.startX;
    const height = e.offsetY - this.startY;

    this.clearCanvas();
    this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    const selectedTool = this.selectedTool;

    if(this.selectedTool === "rect"){
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }else if(selectedTool === "circle"){
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      const centerX = this.startX + radius;
      const centerY = this.startY + radius;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }else if (selectedTool === "arrow") {
      const headlen = 15;
      const dx = e.offsetX - this.startX;
      const dy = e.offsetY - this.startY;
      const angle = Math.atan2(dy, dx);

      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.lineTo(
        e.offsetX - headlen * Math.cos(angle - Math.PI / 6),
        e.offsetY - headlen * Math.sin(angle - Math.PI / 6)
      );
      this.ctx.moveTo(e.offsetX, e.offsetY);
      this.ctx.lineTo(
        e.offsetX - headlen * Math.cos(angle + Math.PI / 6),
        e.offsetY - headlen * Math.sin(angle + Math.PI / 6)
      );
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.lineWidth = 1;
    }
  }

  addTextInput(offsetX: number, offsetY: number, clientX: number, clientY: number) {
    this.typing = true;
    
    const input = document.createElement("textarea");
    input.style.position = "fixed";
    input.style.left = `${clientX}px`;
    input.style.top = `${clientY}px`;
    input.style.background = "transparent";
    input.style.color = "white";
    input.style.font = "24px Arial";
    input.style.border = "1px dashed rgba(255, 255, 255, 0.5)";
    input.style.outline = "none";
    input.style.margin = "0";
    input.style.padding = "0";
    input.style.resize = "none";
    input.style.overflow = "hidden";
    
    document.body.appendChild(input);
    
    setTimeout(() => input.focus(), 0);

    input.addEventListener("blur", () => {
      const text = input.value.trim();
      
      if (text !== "") {
        const shape: Shape = {
          type: "text",
          x: offsetX,
          y: offsetY + 24,
          text: text,
        };
        
        this.existingShapes.push(shape);
        this.clearCanvas();
        
        this.socket.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: Number(this.roomId),
          })
        );
      }
      document.body.removeChild(input);
      this.typing = false;
    });
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
