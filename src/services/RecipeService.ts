import axios from "axios";
import {
  CategoriesAPISchema,
  DrinksAPIResponse,
} from "../utils/recipes-schema";
import { SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);

  const result = CategoriesAPISchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
}

export async function getRecipies(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;

  const { data } = await axios(url);

  console.log(data);
  const result = DrinksAPIResponse.safeParse(data);

  if (result.success) {
    return result.data;
  }
}
