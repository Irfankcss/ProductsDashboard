import type { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { getCategories } from "@/api/categories";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                {categories.map((category) => (<DropdownMenuItem className="justify-between" key={category.id} onClick={() => onSelected(category.id)}>{category.name}
                    <Avatar>
                        <AvatarImage src={category.iconUrl} />
                        <AvatarFallback>{category.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuItem>))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}