import { useEffect, useState } from 'react';
import '../App.css';
import type { Product } from '../models/Product';
import { createProduct, deleteProduct, editProduct, getProducts, searchProducts, type CreateProductDto } from '@/api/products';
import { List, LayoutGrid } from "lucide-react"
import { CreateProductDialog } from '@/components/products/CreateProductDialog';
import { SearchComponent } from '@/components/search/SearchComponent';
import { CategoryList } from '@/components/categories/CategoryList';
import { PaginationBar } from '@/components/products/PaginationBar';
import { ProductListView } from '@/components/products/ProductListView';
import { ProductGridView } from '@/components/products/ProductGridView';
import { Button } from '@/components/ui/button';
import { ProductSkeleton } from '@/components/products/ProductSkeleton';
export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [view, setView] = useState('list');
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
            <div className="flex-col justify-between items-center w-1/5 p-4 pt-40">
                <CategoryList onSelected={(catId: number) => { setSelectedCategoryId(catId) }} />
            </div>
            <div className="flex-col justify-between items-center w-4/5 p-4">
                <div className='flex justify-between items-center'>
                    <SearchComponent searchQuery={searchQuery} onSearch={setSearchQuery} />
                    <CreateProductDialog onCreate={handleCreate} />
                </div>
                <div className="justify-end flex gap-2 mt-4 mb-1">
                    <Button variant="outline" onClick={() => setView("list")}><List /></Button>
                    <Button variant="outline" onClick={() => setView("grid")}><LayoutGrid /></Button>
                </div>
                {loading ? (
                    <ProductSkeleton viewType={view} />
                ) : (
                    <>
                        {view === "list" ? (
                            <ProductListView
                                products={products}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                totalCount={totalCount}
                            />
                        ) : (
                            <ProductGridView
                                products={products}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                totalCount={totalCount}
                            />
                        )}
                        <PaginationBar
                            pageSize={pageSize}
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalCount / pageSize)}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
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