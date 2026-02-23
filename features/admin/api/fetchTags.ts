import { api } from "@/lib/axios";

export async function fetchTags(){
    const {data} = await api.get("/recipes/tags")
    return data
}