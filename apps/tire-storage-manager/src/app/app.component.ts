import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HomeComponent } from '@nx-shell/tire-storage/tsm-home'
import { MainNavComponent } from './main-nav/main-nav.component'

@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent, MainNavComponent],
  selector: 'tsm-app-shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tire-storage-manager'

}
