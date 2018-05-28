import {NgModule} from "@angular/core";
import {ScannerPage} from "./scanner";
import {IonicPageModule} from "ionic-angular";
import {LocationPage} from "../location/location";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ScannerPage,
  ],

  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ScannerPage),
  ],
})
export class ScannerModule{}
