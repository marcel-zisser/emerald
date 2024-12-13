import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenSizeService } from '@emerald/services';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'emerald-ui';

  private readonly screenSizeService = inject(ScreenSizeService);

}
