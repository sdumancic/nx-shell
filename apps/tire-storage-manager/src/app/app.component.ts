import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HomeComponent } from '@nx-shell/tire-storage/tsm-home'

@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent],
  selector: 'nx-shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tire-storage-manager'
}
