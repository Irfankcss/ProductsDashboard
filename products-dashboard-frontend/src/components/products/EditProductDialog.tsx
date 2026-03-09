import type { Product } from "@/models/Product";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "./ProductForm";
import type { CreateProductDto } from "@/api/products";
import { useState } from "react";
import { Button } from "../ui/button";
import { Icon, PencilIcon } from "lucide-react";

interface Props {
    product: Product,
    onUpdate: (product: CreateProductDto, id: number) => void
}
export function EditProductDialog({ product, onUpdate }: Props) {
    const [open, setOpen] = useState(false);

    function handleUpdate(data: CreateProductDto) {
        onUpdate(data, product.id)
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <PencilIcon />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit product</DialogTitle>
                    </DialogHeader>
                    <ProductForm initialValues={{
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        categoryId: product.categoryId
                    }} onSubmit={handleUpdate} />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="flex w-full " variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}