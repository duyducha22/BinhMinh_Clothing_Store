// import React, { useState, useEffect } from 'react';
// import { productsData } from '../data';

// // Gộp tất cả sản phẩm vào một mảng phẳng
// const allProducts = [
//   ...productsData.thuDong,
//   ...productsData.xuanHe,
//   ...productsData.quanNam,
//   ...productsData.phuKien,
// ];

// // Dữ liệu mở rộng cho từng sản phẩm (màu sắc, mô tả, v.v.)
// const productExtras = {
//   default: {
//     colors: [
//       { name: 'Đen', hex: '#1a1a1a' },
//       { name: 'Xám', hex: '#888888' },
//       { name: 'Navy', hex: '#1B2A4A' },
//     ],
//     sizes: ['M', 'L', 'XL', '2XL', '3XL'],
//     description: `
//       <p>Sản phẩm được làm từ chất liệu cao cấp, thoáng mát và bền bỉ. Thiết kế hiện đại, phù hợp với nhiều dịp khác nhau từ đi học, đi làm đến dạo phố.</p>
//       <ul>
//         <li>Chất liệu: Cotton 100% cao cấp</li>
//         <li>Kiểu dáng: Regular / Relaxed fit</li>
//         <li>Phong cách: Casual, streetwear</li>
//         <li>Bảo quản: Giặt máy ở nhiệt độ thấp, không dùng chất tẩy mạnh</li>
//       </ul>
//     `,
//     sizeGuide: [
//       { size: 'M', chest: '88–94', waist: '72–78', height: '160–168' },
//       { size: 'L', chest: '94–100', waist: '78–84', height: '168–175' },
//       { size: 'XL', chest: '100–106', waist: '84–90', height: '175–182' },
//       { size: '2XL', chest: '106–112', waist: '90–96', height: '182–188' },
//       { size: '3XL', chest: '112–120', waist: '96–104', height: '188–195' },
//     ],
//   },
// };

// const ProductDetail = ({ productId, navigate, onAddToCart, onToggleWishlist, isWishlisted }) => {
//   const product = allProducts.find((p) => String(p.id) === String(productId));
//   const extras = productExtras.default;

//   const [mainImg, setMainImg] = useState(product?.img || '');
//   const [selectedColor, setSelectedColor] = useState(extras.colors[0]);
//   const [selectedSize, setSelectedSize] = useState('L');
//   const [qty, setQty] = useState(1);
//   const [activeTab, setActiveTab] = useState('desc');
//   const [showSizeGuide, setShowSizeGuide] = useState(false);
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     if (product) setMainImg(product.img);
//   }, [productId]);

//   if (!product) {
//     return (
//       <div style={{ padding: '120px 10%', textAlign: 'center' }}>
//         <h2>Không tìm thấy sản phẩm</h2>
//         <button
//           onClick={() => navigate('/')}
//           style={{ marginTop: 16, padding: '12px 30px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
//         >
//           ← Về trang chủ
//         </button>
//       </div>
//     );
//   }

//   // Sản phẩm liên quan (cùng danh mục, loại trừ sản phẩm hiện tại)
//   const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

//   const handleAddToCart = () => {
//     if (onAddToCart) onAddToCart(product, selectedSize, selectedColor.name, qty);
//     // Nếu user chưa đăng nhập, onAddToCart sẽ tự navigate sang /login
//     // Chỉ set trạng thái added nếu không bị redirect
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   // Giả lập ảnh phụ (dùng lại ảnh chính)
//   const thumbImgs = [product.img, product.img, product.img];



//   return (
//     <div style={{ paddingTop: 0, fontFamily: "'Segoe UI', sans-serif" }}>
//       <style>{`
//         .pd-breadcrumb a { color: #888; font-size: 12px; text-decoration: none; }
//         .pd-breadcrumb a:hover { color: #000; }
//         .pd-thumb { cursor: pointer; border: 2px solid transparent; transition: .2s; }
//         .pd-thumb:hover, .pd-thumb.active { border-color: #000; }
//         .pd-color-dot { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; padding: 2px; transition: .2s; }
//         .pd-color-dot.active { border-color: #000; }
//         .pd-size-btn { padding: 8px 14px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 12px; font-weight: 500; transition: .2s; min-width: 50px; }
//         .pd-size-btn:hover { border-color: #000; }
//         .pd-size-btn.active { border: 1.5px solid #000; font-weight: 700; background: #000; color: #fff; }
//         .pd-tab-btn { background: none; border: none; border-bottom: 2px solid transparent; padding: 10px 0; cursor: pointer; font-size: 13px; font-weight: 600; margin-right: 30px; color: #888; transition: .2s; }
//         .pd-tab-btn.active { border-bottom-color: #000; color: #000; }
//         .pd-related-card { cursor: pointer; }
//         .pd-related-card:hover img { transform: scale(1.04); }
//         .pd-related-card img { transition: transform .3s; }
//         .size-table td, .size-table th { padding: 8px 16px; border: 1px solid #eee; font-size: 12px; text-align: center; }
//         .size-table th { background: #f5f5f5; font-weight: 700; }
//         .qty-btn { width: 34px; height: 34px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
//         .qty-btn:hover { background: #f5f5f5; }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//         .pd-root { animation: fadeIn .35s ease; }
//       `}</style>

//       <div className="pd-root" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 5% 60px' }}>

//         {/* BREADCRUMB */}
//         <div className="pd-breadcrumb" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 12 }}>
//           <a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>Trang chủ</a>
//           <span style={{ color: '#ccc' }}>/</span>
//           <span style={{ color: '#333' }}>{product.name}</span>
//         </div>

//         {/* MAIN SECTION */}
//         <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start', marginBottom: 60 }}>

//           {/* LEFT: Gallery */}
//           <div style={{ flex: '0 0 55%', display: 'flex', gap: 12 }}>
//             {/* Thumbnails */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//               {thumbImgs.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt=""
//                   onClick={() => setMainImg(src)}
//                   className={`pd-thumb ${mainImg === src && i === thumbImgs.indexOf(src) ? 'active' : ''}`}
//                   style={{ width: 72, height: 90, objectFit: 'cover', display: 'block' }}
//                   onError={e => e.target.src = 'https://via.placeholder.com/72x90?text=IMG'}
//                 />
//               ))}
//             </div>
//             {/* Main image */}
//             <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
//               <img
//                 src={mainImg}
//                 alt={product.name}
//                 style={{ width: '100%', display: 'block', objectFit: 'cover' }}
//                 onError={e => e.target.src = 'https://via.placeholder.com/600x750?text=Binh+Minh'}
//               />
//               <div style={{ position: 'absolute', top: 12, left: 12, background: '#e53935', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 2 }}>
//                 MỚI
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Product Info */}
//           <div style={{ flex: 1 }}>
//             <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#111', letterSpacing: 0.3 }}>{product.name}</h1>



//             <div style={{ marginBottom: 20 }}>
//               <span style={{ fontSize: 26, fontWeight: 900, color: '#000' }}>{product.price}đ</span>
//             </div>

//             <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: 20 }} />

//             {/* Color */}
//             <div style={{ marginBottom: 20 }}>
//               <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10, color: '#333' }}>
//                 Màu sắc: <span style={{ color: '#000', fontWeight: 900 }}>{selectedColor.name}</span>
//               </p>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 {extras.colors.map(c => (
//                   <div
//                     key={c.name}
//                     className={`pd-color-dot ${selectedColor.name === c.name ? 'active' : ''}`}
//                     onClick={() => setSelectedColor(c)}
//                     title={c.name}
//                   >
//                     <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: c.hex }} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Size */}
//             <div style={{ marginBottom: 24 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//                 <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#333', margin: 0 }}>
//                   Kích thước: <span style={{ color: '#000', fontWeight: 900 }}>{selectedSize}</span>
//                 </p>
//                 <span
//                   onClick={() => setShowSizeGuide(!showSizeGuide)}
//                   style={{ fontSize: 11, color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
//                 >
//                   📏 Hướng dẫn chọn size
//                 </span>
//               </div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 {extras.sizes.map(s => (
//                   <button
//                     key={s}
//                     className={`pd-size-btn ${selectedSize === s ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(s)}
//                   >{s}</button>
//                 ))}
//               </div>

//               {/* Size Guide Table */}
//               {showSizeGuide && (
//                 <div style={{ marginTop: 16, border: '1px solid #eee', padding: 16, borderRadius: 4, background: '#fafafa' }}>
//                   <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#333' }}>BẢNG SIZE (cm)</p>
//                   <table className="size-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
//                     <thead>
//                       <tr>
//                         <th>Size</th>
//                         <th>Vòng ngực</th>
//                         <th>Vòng eo</th>
//                         <th>Chiều cao</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {extras.sizeGuide.map(row => (
//                         <tr key={row.size} style={{ background: row.size === selectedSize ? '#fff8f0' : 'transparent' }}>
//                           <td style={{ fontWeight: row.size === selectedSize ? 700 : 400 }}>{row.size}</td>
//                           <td>{row.chest}</td>
//                           <td>{row.waist}</td>
//                           <td>{row.height}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Quantity */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
//               <span style={{ fontSize: 12, fontWeight: 700, color: '#333', textTransform: 'uppercase' }}>Số lượng:</span>
//               <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
//                 <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
//                 <span style={{ width: 40, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{qty}</span>
//                 <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
//               </div>
//               <span style={{ fontSize: 12, color: '#888' }}>Còn hàng</span>
//             </div>

//             {/* CTA Buttons */}
//             <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
//               <button
//                 onClick={handleAddToCart}
//                 style={{
//                   flex: 1, padding: '15px', border: '1.5px solid #000', background: '#fff',
//                   fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: 1,
//                   color: '#000', transition: '.2s'
//                 }}
//               >
//                 {addedToCart ? '✓ ĐÃ THÊM VÀO GIỎ' : 'THÊM VÀO GIỎ HÀNG'}
//               </button>
//               <button
//                 onClick={() => {
//                   if (onAddToCart) onAddToCart(product, selectedSize, selectedColor.name, qty, false);
//                   navigate('/checkout');
//                 }}
//                 style={{
//                   flex: 1, padding: '15px', background: '#000', color: '#fff',
//                   fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', letterSpacing: 1
//                 }}
//               >
//                 MUA NGAY
//               </button>
//               {/* Nút tim yêu thích */}
//               <button
//                 onClick={() => onToggleWishlist && onToggleWishlist(product)}
//                 title={isWishlisted && isWishlisted(product.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
//                 style={{
//                   width: 52, flexShrink: 0, border: '1.5px solid #ddd', background: '#fff',
//                   cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', transition: 'border-color .2s',
//                   color: isWishlisted && isWishlisted(product.id) ? '#e53935' : '#ccc',
//                 }}
//               >
//                 {isWishlisted && isWishlisted(product.id) ? '❤️' : '🤍'}
//               </button>
//             </div>

//             {/* Policies */}
//             <div style={{ borderTop: '1px solid #eee', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
//               {[
//                 ['🚚', 'Miễn phí vận chuyển cho đơn từ 500.000đ'],
//                 ['🔄', 'Đổi trả miễn phí trong 7 ngày'],
//                 ['✅', 'Hàng chính hãng 100%, cam kết chất lượng'],
//               ].map(([icon, text]) => (
//                 <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#555' }}>
//                   <span>{icon}</span>
//                   <span>{text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* TABS: Mô tả / Hướng dẫn bảo quản */}
//         <div style={{ borderTop: '2px solid #000', marginBottom: 40 }}>
//           <div style={{ display: 'flex', borderBottom: '1px solid #eee', paddingTop: 8 }}>
//             {[
//               { key: 'desc', label: 'Mô tả sản phẩm' },
//               { key: 'care', label: 'Hướng dẫn bảo quản' },
//             ].map(t => (
//               <button
//                 key={t.key}
//                 className={`pd-tab-btn ${activeTab === t.key ? 'active' : ''}`}
//                 onClick={() => setActiveTab(t.key)}
//               >{t.label}</button>
//             ))}
//           </div>

//           <div style={{ padding: '24px 0', fontSize: 13, color: '#444', lineHeight: 1.8 }}>
//             {activeTab === 'desc' && (
//               <div dangerouslySetInnerHTML={{ __html: extras.description }} />
//             )}
//             {activeTab === 'care' && (
//               <div>
//                 <p>🧺 Giặt máy ở nhiệt độ dưới 30°C</p>
//                 <p>🚫 Không dùng thuốc tẩy</p>
//                 <p>👕 Phơi nơi thoáng mát, tránh ánh nắng trực tiếp</p>
//                 <p>♨️ Ủi ở nhiệt độ thấp nếu cần</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RELATED PRODUCTS */}
//         <div>
//           <h3 style={{ fontSize: 18, fontWeight: 800, borderBottom: '2px solid #000', paddingBottom: 10, marginBottom: 24, letterSpacing: 1 }}>
//             SẢN PHẨM LIÊN QUAN
//           </h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
//             {related.map(p => (
//               <div
//                 key={p.id}
//                 className="pd-related-card"
//                 onClick={() => navigate(`/product/${p.id}`)}
//               >
//                 <div style={{ overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
//                   <img
//                     src={p.img}
//                     alt={p.name}
//                     style={{ width: '100%', display: 'block' }}
//                     onError={e => e.target.src = 'https://via.placeholder.com/300x380?text=Product'}
//                   />
//                 </div>
//                 <div style={{ marginTop: 12, textAlign: 'center' }}>
//                   <p style={{ fontSize: 12, color: '#333', margin: '0 0 4px', fontWeight: 500 }}>{p.name}</p>
//                   <p style={{ fontWeight: 800, fontSize: 14, color: '#000', margin: 0 }}>{p.price}đ</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useState, useEffect } from 'react';
import api from '../api/api';

const ProductDetail = ({ productId, navigate, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mainImg, setMainImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Lấy thông tin sản phẩm chính
        const { data } = await api.get(`/api/products/${productId}`);
        setProduct(data);
        setMainImg(data.image);

        if (data.variants && data.variants.length > 0) {
          setSelectedSize(data.variants[0].size);
          setSelectedColor(data.variants[0].color);
        }

        // Lấy sản phẩm liên quan cùng Category
        const resRelated = await api.get(`/api/products?category=${data.category}`);
        setRelated(resRelated.data.filter(p => p._id !== data._id).slice(0, 4));

        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error("Lỗi tải chi tiết:", err);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  if (loading) return <div style={{ padding: '120px 10%', textAlign: 'center' }}>Đang tải thông tin sản phẩm...</div>;

  if (!product) {
    return (
      <div style={{ padding: '120px 10%', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: 16, padding: '12px 30px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
        >
          ← Về trang chủ
        </button>
      </div>
    );
  }

  // Dữ liệu mở rộng động từ Database
  const availableSizes = [...new Set(product.variants?.map(v => v.size) || [])];
  const availableColors = [...new Set(product.variants?.map(v => v.color) || [])];
  const thumbImgs = [product.image, product.image, product.image];

  // Bảng Size tĩnh fallback 
  const sizeGuideTable = [
    { size: 'M', chest: '88–94', waist: '72–78', height: '160–168' },
    { size: 'L', chest: '94–100', waist: '78–84', height: '168–175' },
    { size: 'XL', chest: '100–106', waist: '84–90', height: '175–182' },
    { size: '2XL', chest: '106–112', waist: '90–96', height: '182–188' },
    { size: '3XL', chest: '112–120', waist: '96–104', height: '188–195' },
  ];

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product, selectedSize, selectedColor, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div style={{ paddingTop: 0, fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        .pd-breadcrumb a { color: #888; font-size: 12px; text-decoration: none; }
        .pd-breadcrumb a:hover { color: #000; }
        .pd-thumb { cursor: pointer; border: 2px solid transparent; transition: .2s; }
        .pd-thumb:hover, .pd-thumb.active { border-color: #000; }
        .pd-size-btn { padding: 8px 14px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 12px; font-weight: 500; transition: .2s; min-width: 50px; }
        .pd-size-btn:hover { border-color: #000; }
        .pd-size-btn.active { border: 1.5px solid #000; font-weight: 700; background: #000; color: #fff; }
        .pd-tab-btn { background: none; border: none; border-bottom: 2px solid transparent; padding: 10px 0; cursor: pointer; font-size: 13px; font-weight: 600; margin-right: 30px; color: #888; transition: .2s; }
        .pd-tab-btn.active { border-bottom-color: #000; color: #000; }
        .pd-related-card { cursor: pointer; }
        .pd-related-card:hover img { transform: scale(1.04); }
        .pd-related-card img { transition: transform .3s; }
        .size-table td, .size-table th { padding: 8px 16px; border: 1px solid #eee; font-size: 12px; text-align: center; }
        .size-table th { background: #f5f5f5; font-weight: 700; }
        .qty-btn { width: 34px; height: 34px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: #f5f5f5; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .pd-root { animation: fadeIn .35s ease; }
      `}</style>

      <div className="pd-root" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 5% 60px' }}>

        <div className="pd-breadcrumb" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 12 }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>Trang chủ</a>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: '#333' }}>{product.name}</span>
        </div>

        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start', marginBottom: 60 }}>
          <div style={{ flex: '0 0 55%', display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {thumbImgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={() => setMainImg(src)}
                  className={`pd-thumb ${mainImg === src && i === thumbImgs.indexOf(src) ? 'active' : ''}`}
                  style={{ width: 72, height: 90, objectFit: 'cover', display: 'block' }}
                  onError={e => e.target.src = 'https://via.placeholder.com/72x90?text=IMG'}
                />
              ))}
            </div>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
              <img
                src={mainImg}
                alt={product.name}
                style={{ width: '100%', height: '600px', display: 'block', objectFit: 'cover' }}
                onError={e => e.target.src = 'https://via.placeholder.com/600x750?text=Binh+Minh'}
              />
              <div style={{ position: 'absolute', top: 12, left: 12, background: '#e53935', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 2 }}>
                MỚI
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#111', letterSpacing: 0.3 }}>{product.name}</h1>

            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#000' }}>{product.price?.toLocaleString()}đ</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: 20 }} />

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10, color: '#333' }}>
                Màu sắc: <span style={{ color: '#000', fontWeight: 900 }}>{selectedColor}</span>
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {availableColors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ 
                        padding: '5px 15px', border: selectedColor === c ? '1.5px solid #000' : '1px solid #ddd',
                        background: '#fff', cursor: 'pointer', fontSize: '11px', fontWeight: 600
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#333', margin: 0 }}>
                  Kích thước: <span style={{ color: '#000', fontWeight: 900 }}>{selectedSize}</span>
                </p>
                <span
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  style={{ fontSize: 11, color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  📏 Hướng dẫn chọn size
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {availableSizes.map(s => (
                  <button
                    key={s}
                    className={`pd-size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >{s}</button>
                ))}
              </div>

              {showSizeGuide && (
                <div style={{ marginTop: 16, border: '1px solid #eee', padding: 16, borderRadius: 4, background: '#fafafa' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#333' }}>BẢNG SIZE (cm)</p>
                  <table className="size-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Vòng ngực</th>
                        <th>Vòng eo</th>
                        <th>Chiều cao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuideTable.map(row => (
                        <tr key={row.size} style={{ background: row.size === selectedSize ? '#fff8f0' : 'transparent' }}>
                          <td style={{ fontWeight: row.size === selectedSize ? 700 : 400 }}>{row.size}</td>
                          <td>{row.chest}</td>
                          <td>{row.waist}</td>
                          <td>{row.height}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#333', textTransform: 'uppercase' }}>Số lượng:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <span style={{ fontSize: 12, color: '#888' }}>Còn hàng</span>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, padding: '15px', border: '1.5px solid #000', background: '#fff',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: 1,
                  color: '#000', transition: '.2s'
                }}
              >
                {addedToCart ? '✓ ĐÃ THÊM VÀO GIỎ' : 'THÊM VÀO GIỎ HÀNG'}
              </button>
              <button
                onClick={() => {
                  if (onAddToCart) onAddToCart(product, selectedSize, selectedColor, qty, false);
                  navigate('/checkout');
                }}
                style={{
                  flex: 1, padding: '15px', background: '#000', color: '#fff',
                  fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', letterSpacing: 1
                }}
              >
                MUA NGAY
              </button>
              <button
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                title={isWishlisted && isWishlisted(product._id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                style={{
                  width: 52, flexShrink: 0, border: '1.5px solid #ddd', background: '#fff',
                  cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'border-color .2s',
                  color: isWishlisted && isWishlisted(product._id) ? '#e53935' : '#ccc',
                }}
              >
                {isWishlisted && isWishlisted(product._id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['🚚', 'Miễn phí vận chuyển cho đơn từ 500.000đ'],
                ['🔄', 'Đổi trả miễn phí trong 7 ngày'],
                ['✅', 'Hàng chính hãng 100%, cam kết chất lượng'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#555' }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '2px solid #000', marginBottom: 40 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #eee', paddingTop: 8 }}>
            {[
              { key: 'desc', label: 'Mô tả sản phẩm' },
              { key: 'care', label: 'Hướng dẫn bảo quản' },
            ].map(t => (
              <button
                key={t.key}
                className={`pd-tab-btn ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >{t.label}</button>
            ))}
          </div>

          <div style={{ padding: '24px 0', fontSize: 13, color: '#444', lineHeight: 1.8 }}>
            {activeTab === 'desc' && (
              <div dangerouslySetInnerHTML={{ __html: product.description || '<p>Đang cập nhật mô tả...</p>' }} />
            )}
            {activeTab === 'care' && (
              <div>
                <p>🧺 Giặt máy ở nhiệt độ dưới 30°C</p>
                <p>🚫 Không dùng thuốc tẩy</p>
                <p>👕 Phơi nơi thoáng mát, tránh ánh nắng trực tiếp</p>
                <p>♨️ Ủi ở nhiệt độ thấp nếu cần</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, borderBottom: '2px solid #000', paddingBottom: 10, marginBottom: 24, letterSpacing: 1 }}>
            SẢN PHẨM LIÊN QUAN
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {related.map(p => (
              <div
                key={p._id}
                className="pd-related-card"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <div style={{ overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '350px', display: 'block', objectFit: 'cover' }}
                    onError={e => e.target.src = 'https://via.placeholder.com/300x380?text=Product'}
                  />
                </div>
                <div style={{ marginTop: 12, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#333', margin: '0 0 4px', fontWeight: 500 }}>{p.name}</p>
                  <p style={{ fontWeight: 800, fontSize: 14, color: '#000', margin: 0 }}>{p.price?.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;