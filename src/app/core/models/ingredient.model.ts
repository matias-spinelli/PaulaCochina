export type Unit = "g" | "kg" | "ml" | "L" | "unidad" | "cucharada" | "cucharadita" | "taza";

export interface Ingredient {
    name: string;
    quantity: number;
    unit: Unit;
  }