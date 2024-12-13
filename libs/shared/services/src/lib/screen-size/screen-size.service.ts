import { Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export const isMobile = signal(false);

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      isMobile.update( () => result.matches);
    });
  }
}
