import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle create product
  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // Handle edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle save product (create or update)
  const handleSave = async (productData) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await axios.put(`${API}/products/${selectedProduct.id}`, productData);
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await axios.post(`${API}/products`, productData);
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      fetchProducts();
      fetchCategories();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API}/products/${deleteProduct.id}`);
      toast.success("Product deleted successfully");
      setDeleteProduct(null);
      fetchProducts();
      fetchCategories();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" data-testid="admin-dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "products" && (
            <ProductTable
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onDelete={(product) => setDeleteProduct(product)}
              onCreate={handleCreate}
            />
          )}
          
          {activeTab === "analytics" && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center" data-testid="analytics-section">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-500">Analytics features coming soon...</p>
            </div>
          )}
          
          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center" data-testid="users-section">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">User Management</h2>
              <p className="text-gray-500">User management features coming soon...</p>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
        categories={categories}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isOpen={!!deleteProduct}
        productName={deleteProduct?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteProduct(null)}
      />
    </div>
  );
};

export default Dashboard;