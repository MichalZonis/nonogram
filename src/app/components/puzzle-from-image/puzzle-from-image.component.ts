import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-puzzle-from-image',
  templateUrl: './puzzle-from-image.component.html',
  styleUrls: ['./puzzle-from-image.component.css']
})
export class PuzzleFromImageComponent implements OnInit {

  selectedFile!: ImageSnippet;
  @Input() height!: number;
  @Input() width!: number;
  @ViewChild('originalImg') img!: ElementRef
  @Output() pixelatedImgEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const img = new Image();
      img.src = event.target.result
      img.onload = () => {
        console.log(this.img.nativeElement.height, this.img.nativeElement.width)
        img.width = this.img.nativeElement.width
        img.height = this.img.nativeElement.height
        this.pixelateImg(img)
      }
      this.selectedFile = new ImageSnippet(event.target.result, file);
      
    })
  
    reader.readAsDataURL(file);
  }

  pixelateImg(img: any) {
    // create string for board from the image
    let pixelatedImgstr = ""

    var icanvas = document.createElement('canvas');
    
   // let img = new Image();
    //img.src=this.selectedFile.src

    let cellMeasures = 30
    let w = Math.floor(img.naturalWidth / cellMeasures) * cellMeasures;
    let h = Math.floor(img.naturalHeight / cellMeasures) * cellMeasures;

    // INIT CANVAS
    icanvas.width = w;
    icanvas.height = h;

    let xStep = w / this.width
    let yStep = h / this.height

  // TODO: change algorithm with proportioned grid - you can only choose the num of rows. 
    // PASTE GIVEN IMAGE TO CANVAS
    icanvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
    let ictx = icanvas.getContext('2d');

    
    for (let x = 0; x < w; x+=xStep) {
      for (let y = 0; y < h; y+=yStep){
        let imgData = ictx?.getImageData(y, x, yStep, xStep).data
        let color = [imgData![0] ,imgData![1], imgData![2]]

        // check if the color is closer to black or white
        if (color[0]+color[1]+color[2]>(255*3/2)) {
          pixelatedImgstr += '-'
        } else {
          pixelatedImgstr += '*'
        }
      }
    }
    console.log(pixelatedImgstr)

    this.pixelatedImgEvent.emit(pixelatedImgstr)
  }
  

}
