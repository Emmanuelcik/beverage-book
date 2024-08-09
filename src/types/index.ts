import { z } from "zod";
import { CategoriesAPISchema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPISchema>;
