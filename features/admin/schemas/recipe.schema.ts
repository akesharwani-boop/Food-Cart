import * as Yup from "yup";

export const recipeSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  // image: Yup.string().required("Image URL required"),
  tags: Yup.array().min(1, "Select at least one tag"),
  mealType: Yup.array().min(1, "Select meal type"),
});
