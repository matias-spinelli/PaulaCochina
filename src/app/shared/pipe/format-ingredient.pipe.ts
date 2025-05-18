import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIngredient',
  standalone: false
})
export class FormatIngredientPipe implements PipeTransform {

  transform(ingredient: { name: string; amount: number}): string {
    const { amount, name } = ingredient;

/*     const pluralUnits: { [key: string]: string } = {
      unidad: 'unidades',
      cucharada: 'cucharadas',
      cucharadita: 'cucharaditas',
      taza: 'tazas',
      g: 'g',
      kg: 'kg',
      ml: 'ml',
      L: 'L'
    }; */

    //const unitLabel = amount === 1 ? unit : (pluralUnits[unit] || unit);

    return `${amount} de ${name}`;
  }
}