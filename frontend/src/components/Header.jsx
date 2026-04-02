import React, { useState } from 'react';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Giả lập trạng thái: null là chưa login, có object là đã login
  // Bạn có thể đổi thành null để test giao diện khi chưa đăng nhập
  const [user, setUser] = useState({ name: "Test" }); 

  const menuConfig = [
        { 
      title: "TRANG CHỦ", path: "/", 
      active: true 
    },
    { 
      title: "ÁO THU ĐÔNG", path: "/ao-thu-dong",
      subCategories: [
        { name: "Áo Nỉ / Áo Thun Dài Tay", path: "" },
        { name: "Áo Len", path: "" },
        { name: "Áo Khoác", path: "" },
        { name: "Cardigan", path: "" },
        { name: "Áo Blazer / Áo Măng Tô", path: "" },
        { name: "Áo Hoodie", path: "" },
        { name: "BỘ THỂ THAO THU ĐÔNG", path: "" }
      ],
      featuredProducts: [
        { id: "P1", name: "Áo Nỉ Fitted L.2.7812", img: "/images/ao-ni-fitted-l.2.7812.jpg", path: "" },
        { id: "P2", name: "Áo Jacket XL.2.8931", img: "/images/ao-jacket-xl.2.8931.jpg", path: "" },
        { id: "P3", name: "Áo Phao M.2.8561", img: "/images/ao-phao-m.2.8561.jpg", path: ""}
      ]
    },
    { title: "ÁO XUÂN HÈ", path: "",
      subCategories: [
        { name: "Áo Phông", path: "" },
        { name: "Áo Polo", path: "" },
        { name: "Áo Sơ Mi Ngắn Tay", path: "" },
        { name: "Bộ Thể Thao Hè", path: "" },
        { name: "Áo Tank Top", path: "" },
        { name: "Áo Sơ Mi Dài Tay", path: "" }
      ],
      featuredProducts: [
        { id: "P4", name: "Áo Phông Regular L.3.2810", img: "/images/ao-phong-regular-l.3.2810.jpg", path: "" },
        { id: "P5", name: "Áo Phông Regular L.3.2812", img: "/images/ao-phong-regular-l.3.2812.jpg", path: "" },
        { id: "P6", name: "Áo Phông Loose L.4.2807", img: "/images/ao-phong-loose-l.4.2807.jpg", path: ""}
      ]
    },
    { title: "QUẦN", path: "",
      subCategories: [
        { name: "Quần Dài", path: "" },
        { name: "Quần Short", path: "" },
      ],
      featuredProducts: [
        { id: "P7", name: "Quần Âu Slim 30.2.QA099", img: "/images/quan-au-slim-30.2.qa099.jpg", path: "" },
        { id: "P8", name: "Quần Nỉ Straight L.2.1843", img: "/images/quan-ni-straight-l.2.1843.jpg", path: "" },
        { id: "P9", name: "Quần Jeans Straight 30.1.1394", img: "/images/quan-jeans-straight-30.1.1394.jpg", path: ""}
      ]
    },
    { title: "PHỤ KIỆN", path: "",
      subCategories: [
        { name: "Túi/Balo", path: "" },
        { name: "Giày Dép", path: "" },
        { name: "Dây Lưng", path: "" },
        { name: "Mũ", path: "" },
        { name: "Tất", path: "" }
      ],
      featuredProducts: [
        { id: "P10", name: "Dép Nhung 3.9803", img: "/images/dep-nhung-3.9803.jpg", path: "" },
        { id: "P11", name: "Dép Da 1.9804", img: "/images/dep-da-1.9804.jpg", path: "" },
        { id: "P12", name: "M204 Mũ Colorado Since 1977", img: "/images/m204-mu-colorado-since-1977.jpg", path: ""}
      ]
    },
    { title: "HỆ THỐNG CỬA HÀNG", path: "" },
    { title: "THÔNG TIN", path: "" },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log("Đang tìm kiếm:", searchTerm);
      // Điều hướng trang: window.location.href = `/search?q=${searchTerm}`;
    }
  };

  return (
    <header style={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#fff' }}>
      <style>{`
        .main-nav { display: flex; gap: 25px; position: relative; padding: 20px 0; }
        .nav-link { text-decoration: none; color: #000; font-size: 13px; font-weight: 700; position: relative; padding-bottom: 5px; }
        .nav-link::after { content: ''; position: absolute; width: 100%; height: 2px; bottom: 0; left: 0; background-color: #000; transform: scaleX(0); transition: 0.3s; }
        .nav-item-container:hover .nav-link::after, .nav-link.active::after { transform: scaleX(1); }
        
        /* Dropdown kéo dài từ TRANG CHỦ đến THÔNG TIN */
        .dropdown-menu {
          position: absolute; top: 100%; left: 0; right: 0; background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08); display: flex; padding: 30px;
          opacity: 0; visibility: hidden; transition: 0.3s; border-top: 1px solid #eee; justify-content: space-between;
        }
        .nav-item-container:hover .dropdown-menu { opacity: 1; visibility: visible; }
        .dropdown-left { list-style: none; padding: 0; margin: 0; flex: 0 0 200px; text-align: left; }
        .sub-cat-link { display: block; padding: 8px 0; font-size: 13px; color: #666; text-decoration: none; }
        .sub-cat-link:hover { color: #000; padding-left: 5px; transition: 0.2s; }

        /* Search Bar */
        .search-box { position: relative; width: 220px; }
        .search-box input { width: 100%; padding: 8px 35px 8px 15px; border-radius: 20px; border: 1px solid #ddd; outline: none; font-size: 13px; }
        .search-box span { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #888; }

        /* Side Cart */
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; opacity: ${isCartOpen ? '1' : '0'}; visibility: ${isCartOpen ? 'visible' : 'hidden'}; transition: 0.3s; }
        .side-cart { position: fixed; top: 0; right: ${isCartOpen ? '0' : '-400px'}; width: 350px; height: 100%; background: #fff; z-index: 2001; transition: 0.4s; padding: 25px; box-shadow: -5px 0 15px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
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
          <span style={{ cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>🛍️ Giỏ hàng (0)</span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '1px' }}>BINH MINH</div>
        
        <nav className="main-nav">
          {menuConfig.map((item) => (
            <div key={item.title} className="nav-item-container">
              <a href={item.path} className={`nav-link ${item.active ? 'active' : ''}`}>{item.title}</a>
              {item.subCategories && (
                <div className="dropdown-menu">
                  <ul className="dropdown-left">
                    {item.subCategories.map(sub => (
                      <li key={sub.name}><a href={sub.path} className="sub-cat-link">{sub.name}</a></li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {item.featuredProducts.map(prod => (
                      <div key={prod.name} style={{ width: '130px', textAlign: 'center' }}>
                        <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '170px', objectFit: 'cover' }} />
                        <p style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>{prod.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* PHẦN TÌM KIẾM LUÔN HIỆN */}
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <span>🔍</span>
        </div>
      </div>

      {/* 3. MINI CART SIDEBAR */}
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className="side-cart">
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <span style={{ fontWeight: '700' }}>GIỎ HÀNG</span>
          <span style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => setIsCartOpen(false)}>&times;</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '13px' }}>
          Giỏ hàng của bạn đang trống.
        </div>
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <button style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>TIẾN HÀNH ĐẶT HÀNG</button>
        </div>
      </div>
    </header>
  );
};

export default Header;