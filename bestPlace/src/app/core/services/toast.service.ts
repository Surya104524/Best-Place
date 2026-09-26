import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  durationMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  public readonly toasts = this.toastsSignal.asReadonly();

  public show(type: Toast['type'], title: string, message?: string, durationMs = 4000): void {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, type, title, message, durationMs };

    this.toastsSignal.update((current) => [...current, newToast]);

    if (durationMs > 0) {
      setTimeout(() => {
        this.remove(id);
      }, durationMs);
    }
  }

  public success(title: string, message?: string): void {
    this.show('success', title, message);
  }

  public info(title: string, message?: string): void {
    this.show('info', title, message);
  }

  public warning(title: string, message?: string): void {
    this.show('warning', title, message);
  }

  public error(title: string, message?: string): void {
    this.show('error', title, message);
  }

  public remove(id: string): void {
    this.toastsSignal.update((current) => current.filter((t) => t.id !== id));
  }
}
