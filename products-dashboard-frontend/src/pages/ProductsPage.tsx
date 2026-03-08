import { useEffect, useState } from 'react';
import '../App.css';
import type { Product } from '../models/Product';
import { createProduct, deleteProduct, editProduct, getProducts, searchProducts, type CreateProductDto } from '@/api/products';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateProductDialog } from '@/components/products/CreateProductDialog';
import { EditProductDialog } from '@/components/products/EditProductDialog';
import { DeleteProductAlertDialog } from '@/components/products/DeleteProductAlertDialog';
import { SearchComponent } from '@/components/search/SearchComponent';
import { CategoryList } from '@/components/categories/CategoryList';
import { PaginationBar } from '@/components/products/PaginationBar';
export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 6;


    useEffect(() => {
        setLoading(true);

        const hasQuery = !!searchQuery.trim();
        const hasCategory = selectedCategoryId > 0;

        if (!hasQuery && !hasCategory) {
            getProducts(pageSize, currentPage)
                .then(result => { setProducts(result.data); setTotalCount(result.totalCount) })
                .finally(() => setLoading(false));
            return;
        }

        const debounce = setTimeout(() => {
            searchProducts(searchQuery, selectedCategoryId, pageSize, currentPage)
                .then(result => { setProducts(result.data); setTotalCount(result.totalCount) })
                .finally(() => setLoading(false));
        }, 400);

        return () => clearTimeout(debounce);
    }, [searchQuery, selectedCategoryId, currentPage]);


    return (
        <div className="flex flex-row w-full">
            <div className="flex-col justify-between items-center w-1/5 p-4">
                <h2>Filter by:</h2>
                <CategoryList onSelected={(catId: number) => { setSelectedCategoryId(catId) }} />
            </div>
            <div className="flex-col justify-between items-center w-4/5 p-4">
                <div className='flex justify-between items-center'>
                    <SearchComponent searchQuery={searchQuery} onSearch={setSearchQuery} />
                    <CreateProductDialog onCreate={handleCreate} />
                </div>
                {loading ? <p>Loading...</p> :

                    <Table>
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
                                    <TableCell>
                                        <EditProductDialog product={product} onUpdate={handleEdit} />
                                        <DeleteProductAlertDialog product={product} onDelete={handleDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableCaption className='pb-4'>{`Total count: ${totalCount}`}</TableCaption>
                    </Table>
                }
                <PaginationBar pageSize={pageSize} currentPage={currentPage} totalPages={Math.ceil(totalCount / pageSize)} onPageChange={handlePageChange} />
            </div>
        </div>
    )
    async function handleCreate(product: CreateProductDto) {
        await createProduct(product);
        //setProducts((prev) => [...prev, created]);
        setCurrentPage(1);
    }
    async function handleEdit(product: CreateProductDto, id: number) {
        await editProduct(product, id);
        //setProducts((prev) => prev.map((p) => (p.id === id ? edited : p)))
        setCurrentPage(1);
    }
    async function handleDelete(id: number) {
        await deleteProduct(id);
        //setProducts(prev => prev.filter(p => p.id !== id));
        setCurrentPage(1);
    }
    function handlePageChange(page: number) {
        setCurrentPage(page);
    }
}