import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-off-canvas-viewer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './off-canvas-viewer.component.html',
  styleUrl: './off-canvas-viewer.component.css'
})
export class OffCanvasViewerComponent {

}
