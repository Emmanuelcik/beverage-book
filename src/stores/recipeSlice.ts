import { StateCreator } from "zustand";
import { getCategories, getRecipies } from "../services/RecipeService";
import { Categories, Drinks, SearchFilter } from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipies: (values: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipies: async (filters) => {
    const filtersResponse = await getRecipies(filters);

    set({ drinks: filtersResponse });
  },
});
