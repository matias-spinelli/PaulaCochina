import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitLabel',
  standalone: false
})
export class UnitLabelPipe implements PipeTransform {
  transform(unit: string, quantity: number): string {
    if (quantity === 1) return unit; // singular

    // Pluralización básica
    const plurals: { [key: string]: string } = {
      unidad: 'unidades',
      cucharada: 'cucharadas',
      cucharadita: 'cucharaditas',
      taza: 'tazas',
      g: 'g',
      kg: 'kg',
      ml: 'ml',
      L: 'L'
    };

    return plurals[unit] || unit;
  }
}
