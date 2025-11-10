import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { toast } from "sonner";
import {
  isAuthenticated,
  setAxiosAuthHeader,
  logoutAndRedirect,
} from "../lib/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  // protect route and set auth header
  useEffect(() => {
    if (!isAuthenticated()) {
      logoutAndRedirect();
      return;
    }

    // set default Authorization header for axios
    setAxiosAuthHeader(axios);

    // global axios interceptor to catch 401/403 and logout
    const interceptor = axios.interceptors.response.use(
      (resp) => resp,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          toast.error("Session expired. Please login again.");
          logoutAndRedirect();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/product`);
      console.log("Fetched products:", response.data);
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
        await axios.put(`${API}/product/${selectedProduct.id}`, productData);
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await axios.post(`${API}/product`, productData);
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
      await axios.delete(`${API}/product/${deleteProduct.id}`);
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
    <div
      className="flex h-screen overflow-hidden bg-gray-50"
      data-testid="admin-dashboard"
    >
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
            <div
              className="bg-white rounded-xl shadow-sm p-8 text-center"
              data-testid="analytics-section"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Analytics Dashboard
              </h2>
              <p className="text-gray-500">Analytics features coming soon...</p>
            </div>
          )}

          {activeTab === "users" && (
            <div
              className="bg-white rounded-xl shadow-sm p-8 text-center"
              data-testid="users-section"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                User Management
              </h2>
              <p className="text-gray-500">
                User management features coming soon...
              </p>
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
