import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    featured: false,
    imageMain: "",
    imageGallery: [""],
    stock: "",
    rating: "",
    specs: [{ key: "", value: "" }],
  });

  const [newCategory, setNewCategory] = useState("");
  const [useNewCategory, setUseNewCategory] = useState(false);

  useEffect(() => {
    if (product) {
      // Edit mode - populate form with product data
      const specsArray = Object.entries(product.specs || {}).map(([key, value]) => ({
        key,
        value,
      }));
      setFormData({
        name: product.name || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        category: product.category || "",
        featured: product.featured || false,
        imageMain: product.imageMain || "",
        imageGallery: product.imageGallery?.length > 0 ? product.imageGallery : [""],
        stock: product.stock?.toString() || "",
        rating: product.rating?.toString() || "",
        specs: specsArray.length > 0 ? specsArray : [{ key: "", value: "" }],
      });
      setUseNewCategory(false);
    } else {
      // Create mode - reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        featured: false,
        imageMain: "",
        imageGallery: [""],
        stock: "",
        rating: "",
        specs: [{ key: "", value: "" }],
      });
      setNewCategory("");
      setUseNewCategory(false);
    }
  }, [product, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageGalleryChange = (index, value) => {
    const newGallery = [...formData.imageGallery];
    newGallery[index] = value;
    setFormData((prev) => ({ ...prev, imageGallery: newGallery }));
  };

  const addImageGalleryRow = () => {
    setFormData((prev) => ({ ...prev, imageGallery: [...prev.imageGallery, ""] }));
  };

  const removeImageGalleryRow = (index) => {
    const newGallery = formData.imageGallery.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      imageGallery: newGallery.length > 0 ? newGallery : [""],
    }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  const addSpecRow = () => {
    setFormData((prev) => ({ ...prev, specs: [...prev.specs, { key: "", value: "" }] }));
  };

  const removeSpecRow = (index) => {
    const newSpecs = formData.specs.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      specs: newSpecs.length > 0 ? newSpecs : [{ key: "", value: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert specs array to object
    const specsObject = formData.specs.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {});

    // Filter out empty image gallery URLs
    const imageGallery = formData.imageGallery.filter((url) => url.trim() !== "");

    // Determine final category
    const finalCategory = useNewCategory ? newCategory : formData.category;

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      category: finalCategory,
      featured: formData.featured,
      imageMain: formData.imageMain,
      imageGallery,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
      specs: specsObject,
    };

    onSave(productData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        data-testid="product-modal"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              data-testid="product-name-input"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter product name"
              required
              className="mt-1.5"
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              data-testid="product-price-input"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="0.00"
              required
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              data-testid="product-description-input"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={3}
              required
              className="mt-1.5"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category *</Label>
            <div className="mt-1.5 space-y-3">
              {!useNewCategory && categories.length > 0 ? (
                <div className="space-y-2">
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                    data-testid="product-category-select"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUseNewCategory(true)}
                    className="w-full"
                  >
                    + Add New Category
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    data-testid="new-category-input"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    required
                  />
                  {categories.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUseNewCategory(false);
                        setNewCategory("");
                      }}
                      className="w-full"
                    >
                      Choose Existing Category
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Mark this product as featured
              </p>
            </div>
            <Switch
              id="featured"
              data-testid="product-featured-toggle"
              checked={formData.featured}
              onCheckedChange={(checked) => handleChange("featured", checked)}
            />
          </div>

          {/* Main Image */}
          <div>
            <Label htmlFor="imageMain">Main Image URL *</Label>
            <Input
              id="imageMain"
              data-testid="product-main-image-input"
              value={formData.imageMain}
              onChange={(e) => handleChange("imageMain", e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
              className="mt-1.5"
            />
          </div>

          {/* Image Gallery */}
          <div>
            <Label>Image Gallery</Label>
            <div className="space-y-2 mt-1.5">
              {formData.imageGallery.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    data-testid={`gallery-image-input-${index}`}
                    value={url}
                    onChange={(e) => handleImageGalleryChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.imageGallery.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeImageGalleryRow(index)}
                      data-testid={`remove-gallery-image-${index}`}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageGalleryRow}
                data-testid="add-gallery-image-button"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </div>
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              data-testid="product-stock-input"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              placeholder="0"
              className="mt-1.5"
            />
          </div>

          {/* Rating */}
          <div>
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              data-testid="product-rating-input"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              placeholder="0.0"
              className="mt-1.5"
            />
          </div>

          {/* Specs */}
          <div>
            <Label>Specifications</Label>
            <div className="space-y-2 mt-1.5">
              {formData.specs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    data-testid={`spec-key-input-${index}`}
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    placeholder="Key (e.g., Color)"
                  />
                  <Input
                    data-testid={`spec-value-input-${index}`}
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    placeholder="Value (e.g., Blue)"
                  />
                  {formData.specs.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSpecRow(index)}
                      data-testid={`remove-spec-${index}`}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSpecRow}
                data-testid="add-spec-button"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Spec
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="cancel-button"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="save-product-button"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {product ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;