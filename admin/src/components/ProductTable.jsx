import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ProductTable = ({ products, loading, onEdit, onDelete, onCreate }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8" data-testid="loading-state">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm" data-testid="product-table-container">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product inventory ({products.length} items)
          </p>
        </div>
        <Button
          data-testid="add-product-button"
          onClick={onCreate}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div className="p-12 text-center" data-testid="empty-state">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first product</p>
          <Button onClick={onCreate} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="hidden w-20">ID</TableHead>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  data-testid={`product-row-${product.id}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="hidden font-mono text-xs text-gray-500">
                    {product.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>
                    <img
                      src={product.imageMain}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {product.description}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-8 rounded-full text-sm font-medium ${
                        product.stock > 50
                          ? "bg-green-100 text-green-700"
                          : product.stock > 20
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.featured && (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-700">{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        data-testid={`edit-product-${product.id}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        data-testid={`delete-product-${product.id}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

const Package = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export default ProductTable;