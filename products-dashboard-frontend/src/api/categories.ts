import type { Category } from "@/models/Category";
const ApiUrl = import.meta.env.VITE_API_URL as string;

export type CreateCategoryDto = Omit<Category, "id">

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(ApiUrl + "Category");
    const data: Category[] = await response.json();
    return data
}