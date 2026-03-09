import type { Product } from "@/models/Product";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DeleteProductAlertDialog } from "./DeleteProductAlertDialog";
import { EditProductDialog } from "./EditProductDialog";
import type { CreateProductDto } from "@/api/products";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"


interface Props {
    products: Product[];
    totalCount: number;
    onDelete: (id: number) => void;
    onEdit: (product: CreateProductDto, id: number) => void;
}

export function ProductGridView({ products, totalCount, onDelete, onEdit }: Props) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md"
                    >
                        <CardContent className="p-4">
                            <div className="grid grid-cols-[70%_30%] gap-4">

                                <div className="flex flex-col">
                                    <CardTitle className="text-lg font-semibold">
                                        {product.name}
                                    </CardTitle>

                                    <CardDescription className="mt-2 text-sm line-clamp-3">
                                        {product.description}
                                    </CardDescription>
                                </div>

                                <div className="flex flex-col items-center justify-between">
                                    <Avatar className="h-20 w-20 mr-2">
                                        <AvatarImage src={product.imageUrl} className="object-cover" />
                                        <AvatarFallback>
                                            {product.name.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className=" mt-2">
                                        <p className="text-lg font-semibold">
                                            {product.price.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">KM/kg</p>
                                    </div>
                                </div>

                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end gap-2 pt-0 pb-4 px-4">
                            <EditProductDialog product={product} onUpdate={onEdit} />
                            <DeleteProductAlertDialog product={product} onDelete={onDelete} />
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <p className="text-right">Total count: {totalCount}</p>
        </>
    )
}