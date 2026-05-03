import React, { useState } from 'react';

const Header = ({
  navigate,
  currentQuery = "",
  cartItems = [],
  totalItems = 0,
  totalPrice = 0,
  isCartOpen = false,
  setIsCartOpen,
  removeFromCart,
  updateQty,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const [user, setUser] = useState({ name: "Test" });

  const menuConfig = [
    { title: "TRANG CHỦ", path: "/", active: true },
    {
      title: "ÁO THU ĐÔNG", path: "/category/ao-thu-dong", slug: "ao-thu-dong",
      subCategories: ["Áo Nỉ / Áo Thun Dài Tay", "Áo Len", "Áo Khoác", "Cardigan", "Áo Blazer / Áo Măng Tô", "Áo Hoodie", "BỘ THỂ THAO THU ĐÔNG"],
      featuredProducts: [
        { id: 1,  name: "Áo Nỉ Fitted L.2.7812",  img: "/images/ao-ni-fitted-l.2.7812.jpg" },
        { id: 2,  name: "Áo Jacket XL.2.8931",     img: "/images/ao-jacket-xl.2.8931.jpg" },
        { id: 3,  name: "Áo Phao M.2.8561",         img: "/images/ao-phao-m.2.8561.jpg" },
      ]
    },
    {
      title: "ÁO XUÂN HÈ", path: "/category/ao-xuan-he", slug: "ao-xuan-he",
      subCategories: ["Áo Phông", "Áo Polo", "Áo Sơ Mi Ngắn Tay", "Bộ Thể Thao Hè", "Áo Tank Top", "Áo Sơ Mi Dài Tay"],
      featuredProducts: [
        { id: 11, name: "Áo Phông Regular L.3.2810", img: "/images/ao-phong-regular-l.3.2810.jpg" },
        { id: 12, name: "Áo Phông Regular L.3.2812", img: "/images/ao-phong-regular-l.3.2812.jpg" },
        { id: 13, name: "Áo Phông Loose L.4.2807",   img: "/images/ao-phong-loose-l.4.2807.jpg" },
      ]
    },
    {
      title: "QUẦN", path: "/category/quan", slug: "quan",
      subCategories: ["Quần Dài", "Quần Short"],
      featuredProducts: [
        { id: 17, name: "Quần Âu Slim 30.2.QA099",       img: "/images/quan-au-slim-30.2.qa099.jpg" },
        { id: 18, name: "Quần Nỉ Straight L.2.1843",     img: "/images/quan-ni-straight-l.2.1843.jpg" },
        { id: 21, name: "Quần Jeans Straight 30.1.1394", img: "/images/quan-jeans-straight-30.1.1394.jpg" },
      ]
    },
    {
      title: "PHỤ KIỆN", path: "/category/phu-kien", slug: "phu-kien",
      subCategories: ["Túi/Balo", "Giày Dép", "Dây Lưng", "Mũ", "Tất"],
      featuredProducts: [
        { id: 25, name: "Dép Nhung 3.9803",            img: "/images/dep-nhung-3.9803.jpg" },
        { id: 26, name: "Dép Da 1.9804",                img: "/images/dep-da-1.9804.jpg" },
        { id: 29, name: "M204 Mũ Colorado Since 1977", img: "/images/m204-mu-colorado-since-1977.jpg" },
      ]
    },
    { title: "THÔNG TIN", path: "" },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      if (navigate) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      if (navigate) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  const goTo = (path) => {
    if (!path) return;
    if (navigate) navigate(path);
    else window.location.href = path;
  };

  return (
    <header style={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#fff' }}>
      <style>{`
        .main-nav { display: flex; gap: 25px; padding: 20px 0; position: relative; }
        .nav-item-container { }
        .nav-link { color: #000; font-size: 13px; font-weight: 700; position: relative; padding-bottom: 5px; cursor: pointer; white-space: nowrap; }
        .nav-link::after { content: ''; position: absolute; width: 100%; height: 2px; bottom: 0; left: 0; background-color: #000; transform: scaleX(0); transition: 0.25s; }
        .nav-item-container:hover .nav-link::after { transform: scaleX(1); }

        .dropdown-menu {
          position: absolute; top: 100%; left: 0;
          width: 680px;
          background: #fff; border-top: 2px solid #000;
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          display: flex; align-items: flex-start;
          padding: 26px 28px; box-sizing: border-box; gap: 0;
          opacity: 0; visibility: hidden; transition: 0.22s; z-index: 999;
        }
        .nav-item-container:hover .dropdown-menu { opacity: 1; visibility: visible; }
        .dropdown-left { list-style: none; padding: 0; margin: 0; flex: 0 0 175px; text-align: left; border-right: 1px solid #eee; padding-right: 24px; margin-right: 28px; }
        .sub-cat-link { display: block; padding: 7px 0; font-size: 13px; color: #555; cursor: pointer; transition: .15s; white-space: nowrap; }
        .sub-cat-link:hover { color: #000; padding-left: 6px; }
        .feat-products { display: flex; gap: 16px; }
        .feat-prod { cursor: pointer; text-align: center; width: 120px; flex-shrink: 0; }
        .feat-prod:hover p { color: #000; text-decoration: underline; }
        .feat-prod img { display: block; width: 100%; height: 150px; object-fit: cover; }
        .search-box { position: relative; width: 220px; flex-shrink: 0; }
        .search-box input { width: 100%; padding: 8px 35px 8px 15px; border-radius: 20px; border: 1px solid #ddd; outline: none; font-size: 13px; box-sizing: border-box; }
        .search-box span { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #888; }

        /* Side cart */
        .cart-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.45); z-index: 2000;
          opacity: ${isCartOpen ? '1' : '0'};
          visibility: ${isCartOpen ? 'visible' : 'hidden'};
          transition: 0.3s;
        }
        .side-cart {
          position: fixed; top: 0; right: ${isCartOpen ? '0' : '-420px'};
          width: 380px; height: 100%; background: #fff; z-index: 2001;
          transition: right 0.38s cubic-bezier(.4,0,.2,1);
          box-shadow: -5px 0 20px rgba(0,0,0,0.12);
          display: flex; flex-direction: column;
        }
        .cart-item-row { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
        .cart-item-img { width: 72px; height: 90px; object-fit: cover; flex-shrink: 0; background: #f5f5f5; }
        .cart-qty-btn { width: 28px; height: 28px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
        .cart-qty-btn:hover { background: #f5f5f5; }
        .cart-remove { background: none; border: none; cursor: pointer; color: #aaa; font-size: 18px; line-height: 1; }
        .cart-remove:hover { color: #e53935; }
      `}</style>

      {/* 1. TOP BAR */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '6px 5%', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
        <div>📞 0967.28.4444</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user ? (
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="/account" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600' }}>👤 {user.name}</a>
              <span style={{ cursor: 'pointer' }} onClick={() => setUser(null)}>Đăng xuất</span>
            </div>
          ) : (
            <a href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>👤 Tài khoản</a>
          )}
          <span style={{ cursor: 'pointer', fontWeight: totalItems > 0 ? 700 : 400 }} onClick={() => setIsCartOpen(true)}>
            🛍️ Giỏ hàng ({totalItems})
          </span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer' }} onClick={() => goTo('/')}>
          BINH MINH
        </div>

        <nav className="main-nav">
          {menuConfig.map((item) => (
            <div key={item.title} className="nav-item-container">
              <span className={`nav-link ${item.active ? 'active' : ''}`} onClick={() => goTo(item.path)}>
                {item.title}
              </span>
              {item.subCategories && (
                <div className="dropdown-menu">
                  <ul className="dropdown-left">
                    {item.subCategories.map(subName => (
                      <li key={subName}>
                        <span className="sub-cat-link" onClick={() => goTo(`/category/${item.slug}?sub=${encodeURIComponent(subName)}`)}>
                          {subName}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="feat-products">
                    {item.featuredProducts.map(prod => (
                      <div key={prod.id} className="feat-prod" onClick={() => goTo(`/product/${prod.id}`)}>
                        <img
                          src={prod.img}
                          alt={prod.name}
                          onError={e => e.target.src = 'https://via.placeholder.com/120x150?text=IMG'}
                        />
                        <p style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600', color: '#333', margin: '8px 0 0' }}>{prod.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="search-box">
          <input type="text" placeholder="Tìm kiếm..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleSearch} />
          <span onClick={handleSearchClick}>🔍</span>
        </div>
      </div>

      {/* 3. SIDE CART */}
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="side-cart">
        {/* Header cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #eee' }}>
          <span style={{ fontWeight: '800', fontSize: 15, letterSpacing: 0.5 }}>GIỎ HÀNG ({totalItems})</span>
          <span style={{ cursor: 'pointer', fontSize: '24px', color: '#aaa', lineHeight: 1 }} onClick={() => setIsCartOpen(false)}>&times;</span>
        </div>

        {/* Cart body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#aaa' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛍️</div>
              <p style={{ fontSize: 13 }}>Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            cartItems.map(item => {
              const price = parseInt((item.product.price || '0').replace(/,/g, ''));
              return (
                <div key={item.key} className="cart-item-row">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="cart-item-img"
                    onError={e => e.target.src = 'https://via.placeholder.com/72x90?text=IMG'}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#222', margin: 0, lineHeight: 1.4, maxWidth: 200 }}>{item.product.name}</p>
                      <button className="cart-remove" onClick={() => removeFromCart(item.key)}>×</button>
                    </div>
                    <p style={{ fontSize: 11, color: '#888', margin: '4px 0' }}>Size: {item.size} · Màu: {item.color}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee' }}>
                        <button className="cart-qty-btn" onClick={() => updateQty(item.key, -1)}>−</button>
                        <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                        <button className="cart-qty-btn" onClick={() => updateQty(item.key, 1)}>+</button>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: 13 }}>{(price * item.qty).toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart footer */}
        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid #eee', padding: '16px 24px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#555' }}>Tạm tính:</span>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{totalPrice.toLocaleString()}đ</span>
            </div>
            <button
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: 13, letterSpacing: 1 }}
            >
              TIẾN HÀNH ĐẶT HÀNG
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{ width: '100%', marginTop: 10, padding: '12px', background: 'none', color: '#555', border: '1px solid #ddd', fontWeight: '600', cursor: 'pointer', fontSize: 12 }}>
              TIẾP TỤC MUA HÀNG
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;