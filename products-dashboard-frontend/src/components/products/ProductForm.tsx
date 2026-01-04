import type { CreateProductDto } from "@/api/products";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface props {
    onSubmit: (product: CreateProductDto) => void
}

export function ProductForm({ onSubmit }: props) {

    const [form, setForm] = useState<CreateProductDto>({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "price" ? Number(value) : value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
            <Label>Description</Label>
            <Input name="description" value={form.description} onChange={handleChange} />
            <Label>Price</Label>
            <Input name="price" type="number" value={form.price} onChange={handleChange} />
            <Label>Image URL</Label>
            <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            <Button type="submit" className="flex w-full mt-7">Save</Button>
        </form>
    )

}
