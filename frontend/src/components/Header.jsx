import React from 'react';

const Header = () => {
  const menuItems = ["TRANG CHỦ", "ÁO THU ĐÔNG", "ÁO XUÂN HÈ", "QUẦN", "PHỤ KIỆN", "HỆ THỐNG CỬA HÀNG", "THÔNG TIN"];

  return (
    <header style={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#fff' }}>
      {/* 1. TOP BAR */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '6px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: '11px',
        color: '#333',
        fontWeight: '500',
        letterSpacing: '0.5px'
      }}>
        <div>📞 0967.28.4444</div>
        <div style={{ display: 'flex', gap: '25px' }}>
          <span style={{ cursor: 'pointer' }}>👤 Tài khoản</span>
          <span style={{ cursor: 'pointer' }}>🛍️ Giỏ hàng <b style={{color: 'red'}}>(0)</b></span>
        </div>
      </div>

      {/* 2. MAIN NAV */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '20px 5%',
        borderBottom: '1px solid #eee'
      }}>
        {/* LOGO */}
        <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px', cursor: 'pointer', color: '#000' }}>
          BINH MINH
        </div>

        {/* MENU GIỮA */}
        <nav style={{ display: 'flex', gap: '25px' }}>
          {menuItems.map(item => (
            <a key={item} href="#" style={{ 
              textDecoration: 'none', 
              color: '#000', 
              fontSize: '13px', 
              fontWeight: '700', // Chữ đậm chuẩn Atino
              letterSpacing: '0.5px', // Khoảng cách chữ sang trọng
              whiteSpace: 'nowrap'
            }}>
              {item}
            </a>
          ))}
        </nav>

        {/* Ô TÌM KIẾM */}
        <div style={{ position: 'relative', width: '260px' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            style={{
              width: '100%',
              padding: '10px 40px 10px 20px',
              borderRadius: '25px',
              border: '1px solid #ccc',
              fontSize: '13px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '16px' }}>
            🔍
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;