import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../api/admin.api";
import toast from "react-hot-toast";

interface DeleteResponse {
  id: number;
  isDeleted: boolean;
}

export const useDeleteRecipe = () => {
  const qc = useQueryClient();

  return useMutation<DeleteResponse, Error, number>({
    mutationFn: (id: number) => deleteRecipe(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe deleted successfully");
    },
  });
};
