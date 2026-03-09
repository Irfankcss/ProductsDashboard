import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardFooter } from "../ui/card";
interface Props {
    viewType: string
}
export function ProductSkeleton({ viewType }: Props) {
    if (viewType === "list") {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price (KM/kg)</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-4 w-8" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-4 w-32" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-4 w-48" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-4 w-20" />
                            </TableCell>

                            <TableCell>
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </TableCell>

                            <TableCell className="flex gap-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl border">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-[70%_30%] gap-4">

                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-10" />
                            </div>

                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2 pb-4 px-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )

}