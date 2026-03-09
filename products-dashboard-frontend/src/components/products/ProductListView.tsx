import type { Product } from "@/models/Product";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DeleteProductAlertDialog } from "./DeleteProductAlertDialog";
import { EditProductDialog } from "./EditProductDialog";
import type { CreateProductDto } from "@/api/products";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";

interface Props {
    products: Product[];
    totalCount: number;
    onDelete: (id: number) => void;
    onEdit: (product: CreateProductDto, id: number) => void;
}

export function ProductListView({ products, totalCount, onDelete, onEdit }: Props) {
    return <><Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price (KM/kg)</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src={product.imageUrl} />
                            <AvatarFallback>{product.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell className="flex gap-1 ">
                        <EditProductDialog product={product} onUpdate={onEdit} />
                        <DeleteProductAlertDialog product={product} onDelete={onDelete} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
        <p className="text-right">Total count: {totalCount}</p>
    </>
}