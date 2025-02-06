import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, CommonModule]
})
export class AppComponent {
  title = 'AngularDemo';
  activeSection: 'setup' | 'workflow' | 'config' | 'deploy' = 'setup';
}
