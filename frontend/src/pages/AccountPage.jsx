import React from 'react';

const AccountPage = ({ user, onLogout, navigate, orders = [] }) => {
  if (!user) { navigate('/login'); return null; }

  const menuItems = [
    { label: 'Thay đổi thông tin tài khoản', path: '/account/edit' },
    { label: 'Thay đổi mật khẩu', path: '/account/change-password' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 5% 80px', fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: 'center', marginBottom: 48, color: '#111' }}>Tài khoản</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        {/* Thông tin tài khoản */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, borderBottom: '1px solid #111', paddingBottom: 10, marginBottom: 20, letterSpacing: 0.5, color: '#111' }}>
            THÔNG TIN TÀI KHOẢN
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {menuItems.map(item => (
              <span key={item.path}
                onClick={() => navigate(item.path)}
                style={{ fontSize: 13, color: '#444', cursor: 'pointer', transition: '.15s' }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = '#444'}
              >
                {item.label}
              </span>
            ))}
            <span onClick={() => { onLogout(); navigate('/'); }}
              style={{ fontSize: 13, color: '#444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}
              onMouseEnter={e => e.target.style.color = '#e53935'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >
              ➜ Đăng xuất
            </span>
          </div>
        </div>

        {/* Sản phẩm yêu thích & Lịch sử order */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, borderBottom: '1px solid #111', paddingBottom: 10, marginBottom: 20, letterSpacing: 0.5, color: '#111' }}>
            SẢN PHẨM YÊU THÍCH
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span onClick={() => navigate('/account/wishlist')}
              style={{ fontSize: 13, color: '#444', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#000'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >
              Sản phẩm yêu thích
            </span>
            <span onClick={() => navigate('/account/orders')}
              style={{ fontSize: 13, color: '#444', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#000'}
              onMouseLeave={e => e.target.style.color = '#444'}
            >
              Lịch sử order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;