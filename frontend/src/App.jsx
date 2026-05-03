import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";

function useRouter() {
  const getState = () => ({
    path: window.location.pathname,
    search: window.location.search,
  });
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

  // ——— GIỎ HÀNG STATE ———
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // openCart=true chỉ khi bấm "THÊM VÀO GIỎ", không mở khi "MUA NGAY"
  const addToCart = (product, size, color, qty, openCart = true) => {
    setCartItems(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { key, product, size, color, qty }];
    });
    if (openCart) setIsCartOpen(true);
  };

  const clearCart = () => setCartItems([]);

  const removeFromCart = (key) => {
    setCartItems(prev => prev.filter(i => i.key !== key));
  };

  const updateQty = (key, delta) => {
    setCartItems(prev =>
      prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => {
    const price = parseInt((i.product.price || '0').replace(/,/g, ''));
    return sum + price * i.qty;
  }, 0);

  // ——— ROUTES ———
  const productMatch = path.match(/^\/product\/(\d+)$/);
  const productId = productMatch ? productMatch[1] : null;

  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  const categorySlug = categoryMatch ? categoryMatch[1] : null;

  const isSearch = path === "/search";
  const searchQuery = isSearch ? new URLSearchParams(search).get("q") || "" : null;
  const isCheckout = path === "/checkout";

  const renderPage = () => {
    if (productId)
      return <ProductDetail productId={productId} navigate={navigate} onAddToCart={addToCart} />;
    if (categorySlug) {
      const subCat = new URLSearchParams(search).get("sub") || "Tất cả";
      return <CategoryPage slug={categorySlug} initialSubCat={subCat} navigate={navigate} />;
    }
    if (isSearch)
      return <SearchPage query={searchQuery} navigate={navigate} />;
    if (isCheckout)
      return <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} navigate={navigate} removeFromCart={removeFromCart} updateQty={updateQty} clearCart={clearCart} />;
    return <Home navigate={navigate} onAddToCart={addToCart} />;
  };

  return (
    <div style={{ paddingTop: "100px", backgroundColor: "#fff" }}>
      <Header
        navigate={navigate}
        currentQuery={searchQuery || ""}
        cartItems={cartItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;