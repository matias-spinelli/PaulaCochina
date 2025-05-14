export interface Ingredient {
    name: string;
    quantity: number;
    unit: 'g' | 'kg' | 'ml' | 'L' | 'unidad' | 'cucharada' | 'cucharadita' | 'taza';
  }