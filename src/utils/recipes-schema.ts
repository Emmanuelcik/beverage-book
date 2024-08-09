import { z } from "zod";

export const CategoriesAPISchema = z.object({
  drinks: z.array(
    z.object({
      strCategory: z.string(),
    })
  ),
});
