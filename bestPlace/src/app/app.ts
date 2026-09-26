import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MobileNavComponent } from './shared/components/mobile-nav/mobile-nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SearchModalComponent } from './shared/components/search-modal/search-modal.component';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MobileNavComponent,
    FooterComponent,
    SearchModalComponent,
    ToastContainerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public isSearchOpen = signal<boolean>(false);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.isSearchOpen.update((open) => !open);
    } else if (event.key === 'Escape' && this.isSearchOpen()) {
      this.isSearchOpen.set(false);
    }
  }
}
