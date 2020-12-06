import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  constructor(
    private router: Router
  ) {
  }

  navigate(page: string): void {
    this.router.navigate([`home/${page}`]);
  }

  get buttons(): string[] {
    return ['castle', 'transformation'];
  }
}
