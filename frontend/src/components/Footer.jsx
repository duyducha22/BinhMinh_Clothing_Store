import React from 'react';

const Footer = () => {
  return (
    <footer style={{ marginTop: '50px', backgroundColor: '#fff', textAlign: 'left' }}>
      <style>
        {`
          .footer-title { font-weight: 700; font-size: 13px; margin-bottom: 20px; text-transform: uppercase; color: #333; }
          .footer-link { display: block; color: #666; text-decoration: none; font-size: 13px; margin-bottom: 10px; }
          .store-item { font-size: 13px; color: #666; margin-bottom: 8px; list-style: none; line-height: 1.4; }
          .contact-number { font-size: 18px; font-weight: 800; color: #000; margin-top: 5px; display: block; text-decoration: none; }
          .sub-text { font-size: 11px; color: #999; margin-top: 5px; }
          .nowrap { white-space: nowrap; } /* Chống nhảy dòng */
        `}
      </style>

      {/* 1. BANNER */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <img src="/images/footer-banner.jpg" alt="Store Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '40px 10% 0 10%' }} />

      {/* 2. LIÊN HỆ & ĐĂNG KÝ (ĐÃ FIX NHẢY DÒNG) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.4fr 1.4fr 1.6fr 0.6fr', /* Nới rộng 2 cột đầu */
        padding: '30px 10%', 
        alignItems: 'start',
        gap: '20px'
      }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: '600' }} className="nowrap">GỌI MUA HÀNG ( 8:30 - 22:20 )</p>
          <a href="tel:0967284444" className="contact-number">🔴 0967.28.4444</a>
          <p className="sub-text">Tất cả các ngày trong tuần</p>
        </div>
        
        <div>
          <p style={{ fontSize: '12px', fontWeight: '600' }} className="nowrap">GÓP Ý, KHIẾU NẠI ( 8:00 - 17:00 )</p>
          <a href="tel:0968959050" className="contact-number">🔴 096.895.90.50</a>
          <p className="sub-text">Các ngày trong tuần (trừ ngày lễ)</p>
        </div>

        <div>
          <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '15px' }}>ĐĂNG KÝ NHẬN THÔNG TIN MỚI</p>
          <div style={{ display: 'flex' }}>
            <input type="text" placeholder="Nhập email của bạn..." style={{ flex: 1, padding: '10px', border: '1px solid #ddd', fontSize: '13px', outline: 'none' }} />
            <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '0 15px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>ĐĂNG KÝ</button>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '15px' }}></p>
          <div style={{ fontSize: '20px', display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 10%' }} />

      {/* 3. THÔNG TIN CHI TIẾT & HỆ THỐNG CỬA HÀNG (BỎ FANPAGE, THÊM CỬA HÀNG) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.2fr 2.5fr', /* Chia lại 3 cột chính */
        padding: '40px 10%', 
        gap: '50px' 
      }}>
        {/* Cột 1: Hỗ trợ */}
        <div>
          <h3 className="footer-title">HỖ TRỢ KHÁCH HÀNG</h3>
          <a href="#" className="footer-link">Hướng dẫn mua hàng</a>
          <a href="#" className="footer-link">Hướng dẫn chọn size</a>
          <a href="#" className="footer-link">Chính sách đổi trả</a>
          <a href="#" className="footer-link">Thanh toán & Vận chuyển</a>
          <a href="#" className="footer-link">Chính sách bảo mật</a>
        </div>

        {/* Cột 2: Về chúng tôi */}
        <div>
          <h3 className="footer-title">VỀ CHÚNG TÔI</h3>
          <p style={{ fontSize: '13px', fontWeight: '800', marginBottom: '10px' }}>HỘ KINH DOANH ATINO</p>
          <p className="store-item"><b>Địa Chỉ:</b> 110 Phố Nhổn, Tây Tựu, Bắc Từ Liêm, Hà Nội</p>
          <p className="store-item"><b>MST:</b> 01D8004624</p>
          <p className="store-item"><b>Email:</b> cntt@atino.vn</p>
        </div>

        {/* Cột 3: Hệ thống cửa hàng (Chia làm 2 cột nhỏ cho đẹp) */}
        <div>
          <h3 className="footer-title">HỆ THỐNG CỬA HÀNG</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Hà Nội:</p>
              <ul style={{ padding: 0, margin: 0 }}>
                <li className="store-item">• 110 Phố Nhổn</li>
                <li className="store-item">• 1221 Giải Phóng</li>
                <li className="store-item">• 154 Quang Trung, Hà Đông</li>
                <li className="store-item">• 34 Trần Phú, Hà Đông</li>
                <li className="store-item">• 208 Bạch Mai, Hai Bà Trưng</li>
                <li className="store-item">• 175 Chùa Bộc, Đống Đa</li>
              </ul>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Tỉnh thành khác:</p>
              <ul style={{ padding: 0, margin: 0 }}>
                <li className="store-item">• Thanh Hóa: 236 Lê Hoàn</li>
                <li className="store-item">• Vinh: 167 Nguyễn Văn Cừ</li>
                <li className="store-item">• Hải Phòng: 300 Lê Lợi</li>
                <li className="store-item">• Bắc Ninh: 128 Trần Hưng Đạo</li>
                <li className="store-item">• Thái Nguyên: 156 Lương Ngọc Quyến</li>
                <li className="store-item">• Đà Nẵng: 436 Lê Duẩn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;