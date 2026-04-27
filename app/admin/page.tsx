"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  X,
  Upload,
  Check,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: any[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  sizes: string;
  stock: number;
  featured: boolean;
  categoryId: string;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Product Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    stock: "100",
    featured: false,
    images: [] as string[],
    sizes: ["0-6M", "6-12M", "12-18M", "18-24M"] as string[],
  });

  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth") === "true";
    if (isAuth) {
      setAuthenticated(true);
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "orders") {
        const response = await fetch("/api/admin/orders");
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/categories")
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData);
        setCategories(catData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "Tony123") {
      sessionStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
      fetchData();
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setAuthenticated(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: status }),
      });

      if (response.ok) {
        fetchData();
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}` 
        : "/api/admin/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        resetForm();
        fetchData();
        alert(`Product ${editingProduct ? "updated" : "created"} successfully`);
      } else {
        const error = await response.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
        alert("Product deleted successfully");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      categoryId: product.categoryId,
      stock: product.stock.toString(),
      featured: product.featured,
      images: JSON.parse(product.images),
      sizes: JSON.parse(product.sizes),
    });
    setIsProductModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      stock: "100",
      featured: false,
      images: [],
      sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-cream-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-primary-500" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">Admin Gateway</h1>
            <p className="text-neutral-500 mt-2">Secure access to Paula&apos;s Palace</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-neutral-700 mb-2">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-all shadow-xl hover:shadow-primary-100"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-cream-200 p-6 flex justify-between items-center sticky top-0 z-40">
        <h2 className="text-xl font-serif font-bold text-primary-500">Paula&apos;s Admin</h2>
        <button 
          onClick={handleLogout}
          className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="w-80 bg-white border-r border-cream-200 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-primary-500">Paula&apos;s Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${
              activeTab === "orders" ? "bg-primary-500 text-white shadow-lg shadow-primary-100" : "text-neutral-500 hover:bg-cream-50"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Orders</span>
          </button>
          
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${
              activeTab === "products" ? "bg-primary-500 text-white shadow-lg shadow-primary-100" : "text-neutral-500 hover:bg-cream-50"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Products</span>
          </button>
        </nav>

        <div className="p-8 border-t border-cream-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-rose-500 font-bold uppercase tracking-widest text-xs hover:bg-rose-50 w-full p-4 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-neutral-900 capitalize">{activeTab} Management</h1>
            <p className="text-neutral-500 mt-2">Oversee your boutique operations</p>
          </div>
          
          {activeTab === "products" && (
            <button
              onClick={() => {
                setEditingProduct(null);
                resetForm();
                setIsProductModalOpen(true);
              }}
              className="bg-neutral-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center space-x-3 hover:bg-primary-500 transition-all shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          )}
        </header>

        {activeTab === "orders" ? (
          /* Orders Table */
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-cream-200 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-cream-100">
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Order #</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Customer</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Total</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Status</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Date</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs text-neutral-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-neutral-900">{order.orderNumber}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-neutral-900">{order.customerName}</p>
                      <p className="text-xs text-neutral-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-primary-500">{formatPrice(order.total)}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.orderStatus === "delivered" ? "bg-emerald-100 text-emerald-700" :
                        order.orderStatus === "shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary-500 hover:text-primary-600 font-bold uppercase tracking-widest text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="p-12 text-center text-neutral-400 italic">Synchronizing...</div>}
          </div>
        ) : (
          /* Products Grid/List */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-cream-200 flex gap-8 group hover:shadow-xl transition-all duration-500">
                <div className="relative w-40 h-48 bg-cream-50 rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                  <Image
                    src={JSON.parse(product.images)[0] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 bg-gold-50 px-3 py-1 rounded-full mb-3 inline-block">
                        {product.category.name}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">{product.name}</h3>
                    <p className="text-primary-500 font-bold text-xl">{formatPrice(product.price)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-cream-100">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Stock: <span className={product.stock > 10 ? "text-neutral-900" : "text-rose-500"}>{product.stock} units</span></p>
                    {product.featured && (
                      <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        <Check className="w-3 h-3 mr-1" /> Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Modal (Create/Edit) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-8 border-b border-cream-100 flex justify-between items-center bg-cream-50/50">
              <h2 className="text-3xl font-serif font-bold text-neutral-900">
                {editingProduct ? "Edit Masterpiece" : "Create New Product"}
              </h2>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="p-3 hover:bg-white rounded-2xl text-neutral-400 hover:text-neutral-900 transition-all shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-10 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g., Designer Velvet Gown"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Price (₦)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Stock</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="100"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Category</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                      className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none appearance-none"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Media & Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="imageUrl"
                        className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="Paste Cloudinary URL here"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("imageUrl") as HTMLInputElement;
                          if (input.value) {
                            setFormData({...formData, images: [...formData.images, input.value]});
                            input.value = "";
                          }
                        }}
                        className="bg-neutral-900 text-white px-4 rounded-2xl hover:bg-primary-500"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-cream-200">
                          <Image src={img} alt="Preview" fill className="object-cover" />
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})}
                            className="absolute top-0 right-0 bg-rose-500 text-white p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-6 py-4 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none h-32 resize-none"
                      placeholder="Tell the story of this product..."
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-3 bg-cream-50 p-4 rounded-2xl border border-cream-100">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="w-5 h-5 rounded border-cream-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-neutral-700 cursor-pointer">
                      Feature on Homepage
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-cream-100 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-neutral-500 hover:bg-cream-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-500 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-primary-100 flex items-center space-x-3"
                >
                  {loading ? <span>Saving...</span> : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>{editingProduct ? "Update Product" : "Publish Product"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal (Reuse existing logic but stylized) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh]">
            <div className="p-8 border-b border-cream-100 flex justify-between items-center bg-cream-50/50">
              <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900">Order {selectedOrder.orderNumber}</h2>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-white rounded-2xl text-neutral-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-10 space-y-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Customer</h3>
                  <p className="font-bold text-neutral-900">{selectedOrder.customerName}</p>
                  <p className="text-sm text-neutral-500">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Payment</h3>
                  <p className="font-bold text-neutral-900 uppercase">{selectedOrder.paymentMethod}</p>
                  <p className="text-sm text-emerald-600 font-bold uppercase tracking-widest text-[10px]">{selectedOrder.paymentStatus}</p>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center bg-cream-50 p-4 rounded-2xl border border-cream-100">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 text-sm">{item.name}</p>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Size: {item.size} x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary-500">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-cream-100 flex justify-between items-center">
                <p className="text-xl font-serif font-bold text-neutral-900">Total Amount</p>
                <p className="text-2xl font-bold text-primary-500">{formatPrice(selectedOrder.total)}</p>
              </div>
            </div>

            <div className="p-8 bg-cream-50/50 border-t border-cream-100">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 text-center">Update Status</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["processing", "shipped", "delivered", "cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(selectedOrder.id, status)}
                    className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedOrder.orderStatus === status 
                        ? "bg-neutral-900 text-white shadow-lg" 
                        : "bg-white text-neutral-500 border border-cream-200 hover:border-primary-500 hover:text-primary-500"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 px-6 py-4 flex justify-around items-center z-40 pb-safe">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === "orders" ? "text-primary-500" : "text-neutral-400"
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Orders</span>
        </button>
        
        <button
          onClick={() => setActiveTab("products")}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === "products" ? "text-primary-500" : "text-neutral-400"
          }`}
        >
          <Package className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Products</span>
        </button>
      </nav>
      
      {/* Add padding to bottom for mobile nav */}
      <div className="lg:hidden h-24" />
    </div>
  );
}
