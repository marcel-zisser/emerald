import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class IsoDateAdapter extends NativeDateAdapter {
  override parse(value: string): Date | null {
    // Parse dates in ISO 8601 format (YYYY-MM-DD)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isoDateRegex.test(value)) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return super.parse(value);
  }

  override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'YYYY-MM-DD') {
      const year = date.getFullYear();
      const month = this._to2digit(date.getMonth() + 1);
      const day = this._to2digit(date.getDate());
      return `${year}-${month}-${day}`;
    }
    return super.format(date, displayFormat);
  }

  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }
}
