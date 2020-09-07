import { AfterViewInit, Component } from '@angular/core';
import Parallax                     from 'parallax-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'parallax-example';

  ngAfterViewInit() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
  }
}
