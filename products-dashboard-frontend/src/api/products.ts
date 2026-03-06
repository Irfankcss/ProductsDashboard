import type { Product } from "@/models/Product";

const ApiUrl = import.meta.env.VITE_API_URL as string;

export type CreateProductDto = Omit<Product, "id">;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(ApiUrl + "Products");
    const data: Product[] = await response.json();
    return data
}

export async function createProduct(product: CreateProductDto): Promise<Product> {

    console.log(product);
    const response = await fetch(ApiUrl + "Products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "HTTP error " + response.status);
    } else {
        return response.json();
    }
}

export async function editProduct(product: CreateProductDto, id: number): Promise<Product> {
    console.log("EDIT payload:", product, "id:", id);
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "HTTP error " + response.status);
    } else {
        return response.json();
    }
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "DELETE"
    })
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "HTTP error " + response.status);
    }
}

export async function searchProducts(query: string, categoryId?: number): Promise<Product[]> {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    if (categoryId && categoryId > 0) params.set("categoryId", String(categoryId));

    const response = await fetch(`${ApiUrl}search?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Search failed: " + response.statusText);
    }

    return response.json();
}