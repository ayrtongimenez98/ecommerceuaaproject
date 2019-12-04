import { NgModule } from "@angular/core";
import { FormatNumberPipe } from "./format-number.pipe";

@NgModule({
  declarations: [FormatNumberPipe],
  exports: [FormatNumberPipe]
})
export class PipesModule { }
