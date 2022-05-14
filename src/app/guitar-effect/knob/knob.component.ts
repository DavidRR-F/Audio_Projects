import { Component, Input, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AudioService } from '../audio.service';
@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {
  angle = 0;
  activeTicks = 1;
  ticks = Array.from({length: 28}, (_, i) => i + 1);
  @Input() knobLabel!: string;

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
  }

  initAngle(angle: number) {
    this.angle = angle;
    this.activeTicks = (Math.round(this.angle/10)+1);
    this.audioService.setEQ(this.knobLabel, Math.round(this.angle/28));
  }

}
