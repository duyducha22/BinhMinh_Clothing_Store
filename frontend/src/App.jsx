import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import OrdersPage from "./pages/OrdersPage";

function useRouter() {
  const getState = () => ({ path: window.location.pathname, search: window.location.search });
  const [loc, setLoc] = useState(getState);
  useEffect(() => {
    const onPop = () => setLoc(getState());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (to) => {
    window.history.pushState(null, "", to);
    setLoc(getState());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { path: loc.path, search: loc.search, navigate };
}

function App() {
  const { path, search, navigate } = useRouter();

  // ——— USER AUTH ———
  const [user, setUser] = useState(null);

  // Lưu data riêng cho từng tài khoản: { [email]: { cart, orders } }
  const userDataStore = useRef({});

  // Lưu cart/orders của user hiện tại vào store trước khi đổi user
  const saveCurrentUserData = (currentUser, currentCart, currentOrders) => {
    if (currentUser) {
      userDataStore.current[currentUser.email] = {
        cart: currentCart,
        orders: currentOrders,
      };
    }
  };

  // ——— CART & ORDERS ———
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Redirect sang login nếu chưa đăng nhập khi cần mua hàng
  const [pendingAction, setPendingAction] = useState(null);

  const handleLogin = (u) => {
    // Load data của user vừa đăng nhập
    const saved = userDataStore.current[u.email] || { cart: [], orders: [] };
    setUser(u);
    setCartItems(saved.cart);
    setOrders(saved.orders);
    // Nếu có pending action (thêm vào giỏ trước khi đăng nhập) thì thực hiện
    if (pendingAction) {
      const { product, size, color, qty, openCart } = pendingAction;
      const key = product.id + '-' + size + '-' + color;
      setCartItems(prev => {
        const existing = prev.find(i => i.key === key);
        if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
        return [...prev, { key, product, size, color, qty }];
      });
      if (openCart) setIsCartOpen(true);
      setPendingAction(null);
    }
  };

  const handleLogout = () => {
    // Lưu data trước khi logout
    saveCurrentUserData(user, cartItems, orders);
    setUser(null);
    setCartItems([]);
    setOrders([]);
    setIsCartOpen(false);
    navigate('/');
  };

  const handleUpdateUser = (u) => setUser(u);

  // Thêm vào giỏ — yêu cầu đăng nhập
  const addToCart = (product, size, color, qty, openCart = true) => {
    if (!user) {
      // Lưu action lại, chuyển sang trang login
      setPendingAction({ product, size, color, qty, openCart });
      navigate('/login');
      return;
    }
    setCartItems(prev => {
      const key = product.id + '-' + size + '-' + color;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { key, product, size, color, qty }];
    });
    if (openCart) setIsCartOpen(true);
  };

  const removeFromCart = (key) => setCartItems(prev => prev.filter(i => i.key !== key));
  const updateQty = (key, delta) => setCartItems(prev =>
    prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );
  const clearCart = () => setCartItems([]);

  const addOrder = (orderData) => {
    setOrders(prev => {
      const updated = [orderData, ...prev];
      if (user) userDataStore.current[user.email] = { cart: [], orders: updated };
      return updated;
    });
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status: 'Đã hủy' } : o);
      if (user) userDataStore.current[user.email] = { cart: cartItems, orders: updated };
      return updated;
    });
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) =>
    s + parseInt((i.product.price || '0').replace(/,/g, '')) * i.qty, 0
  );

  // Trang checkout yêu cầu đăng nhập
  const requireAuth = (page) => {
    if (!user) { navigate('/login'); return null; }
    return page;
  };

  // ——— ROUTES ———
  const productMatch  = path.match(/^\/product\/(\d+)$/);
  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  const isSearch    = path === "/search";
  const isCheckout  = path === "/checkout";
  const isLogin     = path === "/login";
  const isAccount   = path === "/account";
  const isEditProf  = path === "/account/edit";
  const isChangePw  = path === "/account/change-password";
  const isOrders    = path === "/account/orders";

  const renderPage = () => {
    if (productMatch)  return <ProductDetail productId={productMatch[1]} navigate={navigate} onAddToCart={addToCart} />;
    if (categoryMatch) {
      const sub = new URLSearchParams(search).get("sub") || "Tất cả";
      return <CategoryPage slug={categoryMatch[1]} initialSubCat={sub} navigate={navigate} />;
    }
    if (isSearch)   return <SearchPage query={new URLSearchParams(search).get("q") || ""} navigate={navigate} />;
    if (isCheckout) return requireAuth(<CheckoutPage cartItems={cartItems} totalPrice={totalPrice} navigate={navigate} removeFromCart={removeFromCart} updateQty={updateQty} clearCart={clearCart} addOrder={addOrder} />);
    if (isLogin)    return <LoginPage navigate={navigate} onLogin={handleLogin} />;
    if (isAccount)  return requireAuth(<AccountPage user={user} onLogout={handleLogout} navigate={navigate} />);
    if (isEditProf) return requireAuth(<EditProfilePage user={user} onUpdateUser={handleUpdateUser} navigate={navigate} />);
    if (isChangePw) return requireAuth(<ChangePasswordPage navigate={navigate} />);
    if (isOrders)   return requireAuth(<OrdersPage navigate={navigate} orders={orders} cancelOrder={cancelOrder} />);
    return <Home navigate={navigate} onAddToCart={addToCart} />;
  };

  return (
    <div style={{ paddingTop: "100px", backgroundColor: "#fff" }}>
      <Header
        navigate={navigate}
        currentQuery={isSearch ? new URLSearchParams(search).get("q") || "" : ""}
        cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice}
        isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart} updateQty={updateQty}
        user={user} onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;