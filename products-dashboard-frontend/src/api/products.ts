import type { Product } from "@/models/Product";

const ApiUrl = import.meta.env.VITE_API_URL as string;

export type CreateProductDto = Omit<Product, "id">;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(ApiUrl + "Products");
    const data: Product[] = await response.json();
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
    if (response == null) {
        throw new Error("Failed to create product");
    } else {
        return response.json();
    }
}

export async function editProduct(product: CreateProductDto, id: number): Promise<Product> {
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    if ((response == null)) {
        throw new Error("Failed to edit product");
    } else {
        return response.json();
    }
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(ApiUrl + "Products/" + id, {
        method: "DELETE"
    })
    if (response == null) {
        throw new Error("Failed to delete product");
    }
}

export async function searchProducts(query: string): Promise<Product[]> {
    let data: Product[] = []
    const response = await fetch(ApiUrl + "search" + "?q=" + query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    });
    if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
    }
    const text = await response.text();
    if (!text) return [];

    return JSON.parse(text) as Product[];
}