import { StateCreator } from "zustand";
import { RecipeDetails } from "../types";

export type FavoritesSliceType = {
  favorites: RecipeDetails[];
  favoriteExists: (id: RecipeDetails["idDrink"]) => boolean;
  handleFavorites: (recipe: RecipeDetails) => void;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleFavorites: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      set((state) => ({ favorites: [...state.favorites, recipe] }));
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },
});
