import { Component } from '@angular/core';
import { IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'CinemasPage';
  tab2Root = 'LocationPage';
  tab3Root = 'ScannerPage';

  constructor() {

  }
}
