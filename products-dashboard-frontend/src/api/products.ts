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