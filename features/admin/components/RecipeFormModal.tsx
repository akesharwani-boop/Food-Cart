"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { recipeSchema } from "../schemas/recipe.schema";
import type { RecipePayload } from "../types";

interface Props {
  initialValues: RecipePayload;
  onSubmit: (values: RecipePayload) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function RecipeFormModal({
  initialValues,
  onSubmit,
  open,
  setOpen,
}: Props) {
  const formik = useFormik<RecipePayload>({
    initialValues,
    validationSchema: recipeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recipe Form</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Recipe Name */}
          <Input
            name="name"
            placeholder="Recipe Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}

          {/* Tags */}
          <Input
            placeholder="Tags (comma separated)"
            onChange={(e) =>
              formik.setFieldValue(
                "tags",
                e.target.value.split(",").map((t) => t.trim()),
              )
            }
            defaultValue={formik.values.tags?.join(", ")}
          />
          {formik.touched.tags && formik.errors.tags && (
            <p className="text-sm text-red-500">
              {formik.errors.tags as string}
            </p>
          )}

          {/* Meal Type */}
          <Input
            placeholder="Meal Type (comma separated)"
            onChange={(e) =>
              formik.setFieldValue(
                "mealType",
                e.target.value.split(",").map((m) => m.trim()),
              )
            }
            defaultValue={formik.values.mealType?.join(", ")}
          />
          {formik.touched.mealType && formik.errors.mealType && (
            <p className="text-sm text-red-500">
              {formik.errors.mealType as string}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
