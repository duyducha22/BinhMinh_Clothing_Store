import React, { useState } from 'react';

const TINH_THANH = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng',
  'Cần Thơ', 'Bắc Ninh', 'Thanh Hóa', 'Nghệ An', 'Thái Nguyên',
  'Bình Dương', 'Đồng Nai', 'Vĩnh Phúc', 'Hưng Yên', 'Nam Định',
];

const QUAN_HUYEN = {
  'Hà Nội': ['Hoàn Kiếm', 'Đống Đa', 'Hai Bà Trưng', 'Cầu Giấy', 'Hà Đông', 'Bắc Từ Liêm', 'Nam Từ Liêm'],
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 5', 'Bình Thạnh', 'Gò Vấp', 'Tân Bình'],
};

const CheckoutPage = ({ cartItems = [], totalPrice = 0, navigate, removeFromCart, updateQty, clearCart, addOrder }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    tinh: '', huyen: '', phuong: '', note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping   = totalPrice >= 500000 ? 0 : 30000;
  const finalTotal = totalPrice + shipping;

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ và tên';
    if (!form.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    if (!form.address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    if (!form.tinh) e.tinh = 'Vui lòng chọn tỉnh/thành';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    // Lưu đơn hàng vào lịch sử
    if (addOrder) {
      const now = new Date();
      addOrder({
        id: Date.now(),
        date: now.toLocaleDateString('vi-VN'),
        total: totalPrice,
        items: cartItems.reduce((s, i) => s + i.qty, 0),
        status: 'Chờ xác nhận',
        products: cartItems.map(i => ({ ...i })),
        address: form.address + (form.phuong ? ', ' + form.phuong : '') + (form.huyen ? ', ' + form.huyen : '') + (form.tinh ? ', ' + form.tinh : ''),
        name: form.name,
        phone: form.phone,
      });
    }
    if (clearCart) clearCart();
    setSubmitted(true);
  };

  // Tự chuyển về trang chủ khi giỏ hàng trống
  React.useEffect(() => {
    if (cartItems.length === 0 && !submitted) {
      navigate('/');
    }
  }, [cartItems]);


  const inputStyle = (field) => ({
    width: '100%', padding: '12px 14px',
    border: '1px solid ' + (errors[field] ? '#e53935' : '#ddd'),
    fontSize: 13, outline: 'none', borderRadius: 4, boxSizing: 'border-box',
    fontFamily: 'inherit', color: '#222',
  });

  const selectStyle = (field) => ({
    ...inputStyle(field), background: '#fff', cursor: 'pointer', appearance: 'none',
  });

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 5%' }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Đặt hàng thành công!</h2>
        <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
          Cảm ơn bạn đã mua hàng tại <strong>Binh Minh Store</strong>.
        </p>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 32 }}>
          Chúng tôi sẽ XÁC NHẬN đơn hàng bằng TIN NHẮN SMS hoặc GỌI ĐIỆN. Vui lòng kiểm tra TIN NHẮN hoặc NGHE MÁY ngay khi đặt hàng thành công và CHỜ NHẬN HÀNG.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '14px 40px', background: '#000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: 1 }}
        >
          TIẾP TỤC MUA HÀNG
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '80vh' }}>
      <style>{`
        .ck-input:focus { border-color: #000 !important; }
        .ck-select:focus { border-color: #000 !important; }
        .ck-select-wrap { position: relative; }
        .ck-select-wrap::after { content: '▾'; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 12px; color: #888; }
        .ck-err { color: #e53935; font-size: 11px; margin-top: 4px; }
        .ck-cart-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid #f0f0f0; align-items: center; }
        .ck-qty-btn { width: 26px; height: 26px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
        .ck-qty-btn:hover { background: #f5f5f5; }
        @keyframes ckFade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '30px 5% 80px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'start' }}>

        {/* LEFT — Form */}
        <div>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#888', marginBottom: 28 }}>
            <span style={{ cursor: 'pointer', color: '#555' }} onClick={() => navigate('/')}>Giỏ hàng</span>
            <span>›</span>
            <span style={{ color: '#111', fontWeight: 600 }}>Thanh toán</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: '#111' }}>Thông tin giao hàng</h2>

          {/* Name */}
          <div style={{ marginBottom: 14 }}>
            <input
              className="ck-input"
              placeholder="Họ và tên *"
              value={form.name}
              onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: '' })); }}
              style={inputStyle('name')}
            />
            {errors.name && <p className="ck-err">{errors.name}</p>}
          </div>

          {/* Email + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <input
              className="ck-input"
              placeholder="Email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              style={inputStyle('')}
            />
            <div>
              <input
                className="ck-input"
                placeholder="Số điện thoại *"
                value={form.phone}
                onChange={e => { set('phone', e.target.value); setErrors(er => ({ ...er, phone: '' })); }}
                style={inputStyle('phone')}
              />
              {errors.phone && <p className="ck-err">{errors.phone}</p>}
            </div>
          </div>

          {/* Address */}
          <div style={{ marginBottom: 14 }}>
            <input
              className="ck-input"
              placeholder="Địa chỉ *"
              value={form.address}
              onChange={e => { set('address', e.target.value); setErrors(er => ({ ...er, address: '' })); }}
              style={inputStyle('address')}
            />
            {errors.address && <p className="ck-err">{errors.address}</p>}
          </div>

          {/* Tỉnh + Quận */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <div className="ck-select-wrap">
                <select
                  className="ck-select"
                  value={form.tinh}
                  onChange={e => { set('tinh', e.target.value); set('huyen', ''); setErrors(er => ({ ...er, tinh: '' })); }}
                  style={selectStyle('tinh')}
                >
                  <option value="">Tỉnh / Thành phố *</option>
                  {TINH_THANH.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {errors.tinh && <p className="ck-err">{errors.tinh}</p>}
            </div>
            <div className="ck-select-wrap">
              <select
                className="ck-select"
                value={form.huyen}
                onChange={e => set('huyen', e.target.value)}
                style={selectStyle('')}
              >
                <option value="">Quận / Huyện</option>
                {(QUAN_HUYEN[form.tinh] || []).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
          </div>

          {/* Phường */}
          <div style={{ marginBottom: 20 }}>
            <input
              className="ck-input"
              placeholder="Phường / Xã"
              value={form.phuong}
              onChange={e => set('phuong', e.target.value)}
              style={inputStyle('')}
            />
          </div>

          {/* Ghi chú */}
          <div style={{ marginBottom: 28 }}>
            <textarea
              className="ck-input"
              placeholder="Ghi chú (tùy chọn)"
              value={form.note}
              onChange={e => set('note', e.target.value)}
              rows={3}
              style={{ ...inputStyle(''), resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          {/* Phương thức thanh toán */}
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: '#111' }}>Phương thức thanh toán</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1.5px solid #000', borderRadius: 4, cursor: 'pointer', marginBottom: 28 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Thanh toán khi nhận hàng (COD)</span>
          </label>

          {/* Notice */}
          <div style={{ background: '#fffbf0', border: '1px solid #ffe082', borderRadius: 4, padding: '14px 16px', fontSize: 12, color: '#7a6000', lineHeight: 1.7, marginBottom: 28 }}>
            Chúng tôi sẽ <strong>XÁC NHẬN</strong> đơn hàng bằng <strong>TIN NHẮN SMS</strong> hoặc <strong>GỌI ĐIỆN</strong>. Vui lòng kiểm tra TIN NHẮN hoặc NGHE MÁY ngay khi đặt hàng thành công và <strong>CHỜ NHẬN HÀNG</strong>.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span
              style={{ fontSize: 12, color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => navigate('/')}
            >
              ‹ Tiếp tục mua sắm
            </span>
            <button
              onClick={handleSubmit}
              style={{ flex: 1, padding: '16px', background: '#1565C0', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', borderRadius: 4, letterSpacing: 0.5 }}
            >
              Hoàn tất đơn hàng
            </button>
          </div>
        </div>

        {/* RIGHT — Order summary */}
        <div style={{ background: '#fafafa', borderRadius: 8, border: '1px solid #eee', padding: 28, position: 'sticky', top: 120 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 20, color: '#111', letterSpacing: 0.3 }}>ĐƠN HÀNG CỦA BẠN</h3>

          {/* Items */}
          <div style={{ marginBottom: 20 }}>
            {cartItems.length === 0 ? (
              <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '20px 0' }}>Giỏ hàng trống</p>
            ) : (
              cartItems.map(item => {
                const price = parseInt((item.product.price || '0').replace(/,/g, ''));
                return (
                  <div key={item.key} className="ck-cart-item">
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        style={{ width: 60, height: 75, objectFit: 'cover', background: '#f0f0f0', display: 'block' }}
                        onError={e => e.target.src = 'https://via.placeholder.com/60x75?text=IMG'}
                      />
                      <span style={{
                        position: 'absolute', top: -8, right: -8, background: '#555', color: '#fff',
                        fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{item.qty}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, margin: '0 0 3px', color: '#222', lineHeight: 1.4 }}>{item.product.name}</p>
                      <p style={{ fontSize: 11, color: '#888', margin: '0 0 8px' }}>{item.color} · {item.size}</p>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button className="ck-qty-btn" onClick={() => updateQty && updateQty(item.key, -1)}>−</button>
                        <span style={{ fontSize: 12, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                        <button className="ck-qty-btn" onClick={() => updateQty && updateQty(item.key, 1)}>+</button>
                        <button
                          onClick={() => removeFromCart && removeFromCart(item.key)}
                          style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#bbb', padding: '0 4px' }}
                          title="Xóa"
                        >🗑</button>
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>
                      {(price * item.qty).toLocaleString()}đ
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Price breakdown */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555', marginBottom: 8 }}>
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555', marginBottom: 16 }}>
              <span>Phí vận chuyển</span>
              <span style={{ color: shipping === 0 ? '#2e7d32' : '#000' }}>
                {shipping === 0 ? 'Miễn phí' : shipping.toLocaleString() + 'đ'}
              </span>
            </div>
            {shipping > 0 && (
              <p style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>Miễn phí vận chuyển cho đơn từ 500.000đ</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #111', paddingTop: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Tổng cộng</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: '#888', marginRight: 6 }}>VND</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#000' }}>{finalTotal.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;