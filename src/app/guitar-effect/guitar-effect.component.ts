import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';

@Component({
  selector: 'app-guitar-effect',
  templateUrl: './guitar-effect.component.html',
  styleUrls: ['./guitar-effect.component.scss']
})
export class GuitarEffectComponent implements OnInit {

  knobs = ['volume', 'low', 'mid', 'treble'];
  visualizer!: HTMLCanvasElement;
  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.audioService.setupContext();
    this.visualizer = <HTMLCanvasElement> document.getElementById('visualizer');
    this.audioService.drawVisualizer(this.visualizer);
  }

}
