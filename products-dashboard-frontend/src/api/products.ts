import type { PagedResult } from "@/models/PagedResult";
import type { Product } from "@/models/Product";
import { toast } from "sonner";

const ApiUrl = import.meta.env.VITE_API_URL as string;

export type CreateProductDto = Omit<Product, "id">;

export async function getProducts(pageSize: number = 4, currentPage: number = 1): Promise<PagedResult<Product>> {
    const response = await fetch(ApiUrl + `Products?currentPage=${currentPage}&pageSize=${pageSize}`);
    if (!response.ok) {
        toast.error("Get products failed");
        throw new Error("Get products failed");
    }
    const data: PagedResult<Product> = await response.json();
    return data
}

export async function createProduct(product: CreateProductDto): Promise<Product> {
    const response = await fetch(ApiUrl + "Products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    if (!response.ok) {
        const message = await response.text();
        toast.error("Unable to create product");
        throw new Error(message || "HTTP error " + response.status);
    } else {
        toast.success("Product created successfully");
        return response.json();
    }
}

export async function editProduct(product: CreateProductDto, id: number): Promise<Product> {
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
    if (!response.ok) {
        const message = await response.text();
        toast.error("Unable to edit product");
        throw new Error(message || "HTTP error " + response.status);
    } else {
        toast.success("Product edited successfully");
        return response.json();
    }
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "DELETE"
    })
    if (!response.ok) {
        const message = await response.text();
        toast.error("Unable to delete product");
        throw new Error(message || "HTTP error " + response.status);
    } else {
        toast.success("Product deleted successfully");
        return
    }
}

export async function searchProducts(query: string, categoryId?: number, pageSize: number = 4, currentPage: number = 1): Promise<PagedResult<Product>> {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    if (categoryId && categoryId > 0) params.set("categoryId", String(categoryId));
    params.set("pageSize", String(pageSize));
    params.set("currentPage", String(currentPage));
    const response = await fetch(`${ApiUrl}search?${params.toString()}`);
    if (!response.ok) {
        toast.error("Search failed: " + response.statusText);
        throw new Error("Search failed: " + response.statusText);
    }
    const data: PagedResult<Product> = await response.json();
    return data;

}