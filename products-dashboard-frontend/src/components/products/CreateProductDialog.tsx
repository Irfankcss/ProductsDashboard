import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { type CreateProductDto } from "@/api/products";
import { CirclePlus } from "lucide-react";

interface Props {
    onCreate: (product: CreateProductDto) => void
}

export function CreateProductDialog({ onCreate }: Props) {
    const [open, setOpen] = useState(false);

    function handleSubmit(product: CreateProductDto) {
        onCreate(product)
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button variant="outline"><CirclePlus />Add product</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add product</DialogTitle>
                    </DialogHeader>

                    <ProductForm onSubmit={handleSubmit} />
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