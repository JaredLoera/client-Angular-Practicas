import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasViewerComponent } from './off-canvas-viewer.component';

describe('OffCanvasViewerComponent', () => {
  let component: OffCanvasViewerComponent;
  let fixture: ComponentFixture<OffCanvasViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffCanvasViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffCanvasViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
