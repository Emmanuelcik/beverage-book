import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipieDetails,
  getRecipies,
} from "../services/RecipeService";
import {
  Categories,
  Drink,
  Drinks,
  RecipieDetails,
  SearchFilter,
} from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipie: RecipieDetails;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipies: (values: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: {
    drinks: [],
  },
  selectedRecipie: {} as RecipieDetails,
  modal: false,
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
  selectRecipe: async (id) => {
    const recipieDetails = await getRecipieDetails(id);

    set({ selectedRecipie: recipieDetails, modal: true });
  },

  closeModal: () => {
    set({ modal: false, selectedRecipie: {} as RecipieDetails });
  },
});
