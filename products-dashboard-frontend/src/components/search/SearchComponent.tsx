import { Input } from "../ui/input"

interface Props {
    searchQuery: string
    onSearch: (query: string) => void
}
export function SearchComponent({ searchQuery, onSearch }: Props) {

    return (
        <div className="flex items-center space-x-2 py-4 w-full">
            <Input placeholder="Search..." className="w-full" value={searchQuery} onChange={(e) => { onSearch(e.target.value) }} />
        </div>
    )
}