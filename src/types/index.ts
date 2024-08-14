import { z } from "zod";
import {
  CategoriesAPISchema,
  DrinkAPIResponse,
  DrinksAPIResponse,
  SearchFilterSchem,
} from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPISchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchem>;
export type Drinks = z.infer<typeof DrinksAPIResponse>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
