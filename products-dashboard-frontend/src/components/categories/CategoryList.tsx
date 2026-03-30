import type { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { getCategories } from "@/api/categories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";

type Props = {
    onSelected: (categoryId: number) => void
}
export function CategoryList({ onSelected }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories);
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold pb-4">Filter by category</h2>
            <RadioGroup
                defaultValue="0"
                className="max-w-sm"
                onValueChange={(value) => onSelected(Number(value))}
            >
                <FieldLabel htmlFor="category-all">
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>All categories</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="0" id="category-all" />
                    </Field>
                </FieldLabel>

                {categories.map((category) => (
                    <FieldLabel className="min-h-[72px] rounded-md cursor-pointer" htmlFor={`category-${category.id}`} key={category.id}>
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>{category.name}</FieldTitle>
                            </FieldContent>

                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={category.iconUrl} />
                                    <AvatarFallback>
                                        {category.name.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <RadioGroupItem
                                    value={String(category.id)}
                                    id={`category-${category.id}`}
                                />
                            </div>
                        </Field>
                    </FieldLabel>
                ))}
            </RadioGroup>
        </div>);
}