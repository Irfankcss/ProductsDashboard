import type { CreateProductDto } from "@/api/products";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCategories } from "@/api/categories";
import type { Category } from "@/models/Category";

interface props {
    initialValues?: CreateProductDto
    onSubmit: (product: CreateProductDto) => void
}

export function ProductForm({ initialValues, onSubmit }: props) {

    const [form, setForm] = useState<CreateProductDto>(initialValues ??
    {
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        categoryId: 0
    }
    );
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories);
    }, [])
    useEffect(() => {
        if (initialValues) setForm(initialValues);
    }, [initialValues]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "price" ? Number(value) : value });
    }
    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: Number(value) });
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
            <Label>Category</Label>
            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                name="categoryId" value={form.categoryId} onChange={handleChangeSelect}>
                {
                    categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))
                }
            </select>
            <Button type="submit" className="flex w-full mt-7">Save</Button>
        </form>
    )

}
