import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'gpmrs';

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  canvasWidth = window.innerWidth - 10;
  canvasHeight = window.innerHeight - 10;
  fontSize = 16
  columns = Math.floor(this.canvasWidth / 20) + 1;
  ypos = Array(this.columns).fill(0);

  public context: any;

  nums = '0123456789';
  rainDrops: any = [];


  ngAfterViewInit(): void {
    if (this.canvas !== undefined) {
      this.canvas.nativeElement.focus();
    }
    this.context = this.canvas.nativeElement.getContext('2d')



    setInterval(this.draw, 50);
  }

  draw = () => {

    window.addEventListener('resize', ()=> {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
    });
    // Draw a semitransparent black rectangle on top of previous drawing
  this.context.fillStyle = '#0001';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  // Set color to green and font to 15pt monospace in the drawing context
  this.context.fillStyle = '#f00';
  this.context.font = '15pt monospace';

  // for each column put a random character at the end
  this.ypos.forEach((y, ind) => {
    // generate a random character
    const text = String.fromCharCode(Math.random() * 128);

    // x coordinate of the column, y coordinate is already given
    const x = ind * 20;
    // render the character at (x, y)
    this.context.fillText(text, x, y);

    // randomly reset the end of the column if it's at least 100px high
    if (y > 100 + Math.random() * 10000) this.ypos[ind] = 0;
    // otherwise just move the y coordinate for the column 20px down,
    else this.ypos[ind] = y + 20;
  });
}

}
