import { StateCreator } from "zustand";
import { RecipeDetails } from "../types";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: RecipeDetails[];
  favoriteExists: (id: RecipeDetails["idDrink"]) => boolean;
  handleFavorites: (recipe: RecipeDetails) => void;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleFavorites: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Deleted Successfully",
        error: false,
      });
    } else {
      set((state) => ({ favorites: [...state.favorites, recipe] }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Added To Favorites",
        error: false,
      });
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
