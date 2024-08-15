import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeDetails,
  getRecipes,
} from "../services/RecipeService";
import {
  Categories,
  Drink,
  Drinks,
  RecipeDetails,
  SearchFilter,
} from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: RecipeDetails;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (values: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as RecipeDetails,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipes: async (filters) => {
    const filtersResponse = await getRecipes(filters);

    set({ drinks: filtersResponse });
  },
  selectRecipe: async (id) => {
    const recipeDetails = await getRecipeDetails(id);

    set({ selectedRecipe: recipeDetails, modal: true });
  },

  closeModal: () => {
    set({ modal: false, selectedRecipe: {} as RecipeDetails });
  },
});
