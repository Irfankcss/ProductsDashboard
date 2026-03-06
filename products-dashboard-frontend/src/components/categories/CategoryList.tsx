import type { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { getCategories } from "@/api/categories";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    onSelected: (categoryId: number) => void
}
export function CategoryList({ onSelected }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories);
    }, [])

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">Category</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onSelected(0)}>All categories</DropdownMenuItem>
                {categories.map((category) => (<DropdownMenuItem key={category.id} onClick={() => onSelected(category.id)}>{category.name}</DropdownMenuItem>))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}