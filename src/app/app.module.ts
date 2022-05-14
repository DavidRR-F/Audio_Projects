import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GuitarEffectComponent } from './guitar-effect/guitar-effect.component';
import { KnobComponent } from './guitar-effect/knob/knob.component';
import { KnobControlDirective } from './guitar-effect/knob/knob-control.directive';

@NgModule({
  declarations: [
    AppComponent,
    GuitarEffectComponent,
    KnobComponent,
    KnobControlDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
