import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  context = new AudioContext();
  analyserNode = new AnalyserNode(this.context, { fftSize: 256 })
  
  gainNode = new GainNode(this.context, {gain: 0});
  bassEQ = new BiquadFilterNode(this.context, {
    type: 'lowshelf',
    frequency: 500,
    gain: 0
  });
  midEQ = new BiquadFilterNode(this.context, {
    type: 'peaking',
    Q: Math.SQRT1_2,
    frequency: 1500,
    gain: 0
  });
  trebleEQ = new BiquadFilterNode(this.context, {
    type: 'highshelf',
    frequency: 3000,
    gain: 0
  });

  constructor() { }

  async setupContext () {
    const instrument = await this.getAudio();
    if(this.context.state === 'suspended') {
      await this.context.resume();
    }
    const source = this.context.createMediaStreamSource(instrument);
    source
    .connect(this.trebleEQ)
    .connect(this.midEQ)
    .connect(this.bassEQ)
    .connect(this.gainNode)
    .connect(this.analyserNode)
    .connect(this.context.destination)
  }

  getAudio() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0
      }
    });
  }

  setEQ(knob: string, value: number) {
    if(knob === 'volume') {
      this.gainNode.gain.setTargetAtTime(value, this.context.currentTime, .01);
    }
    if(knob === 'low') {
      this.bassEQ.gain.setTargetAtTime(value, this.context.currentTime, .01);
    }
    if(knob === 'mid') {
      this.midEQ.gain.setTargetAtTime(value, this.context.currentTime, .01);
    }
    if(knob === 'treble') {
      this.trebleEQ.gain.setTargetAtTime(value, this.context.currentTime, .01);
    }
  }

  drawVisualizer(visualizer: HTMLCanvasElement) {
    const step = () => {
      requestAnimationFrame(step);
      const bufferLength = this.analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyserNode.getByteFrequencyData(dataArray);

      const width = visualizer.clientWidth;
      const height = visualizer.clientHeight;
      const barWidth = width / bufferLength;

      const canvasContext = visualizer.getContext('2d');
      canvasContext!.clearRect(0, 0, width, height);

      dataArray.forEach((item, index) => {
        const y = item / 255 * height / 2;
        const x = barWidth * index;

        canvasContext!.fillStyle = '#a8d8f8';
        canvasContext!.fillRect(x, (height - y)/2, barWidth, y);
      });
    }

    step();

  }


}
