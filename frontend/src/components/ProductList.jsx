import React from 'react';

// Component này sẽ dùng chung cho tất cả các mục sản phẩm
const ProductList = ({ title, subCats, products }) => {
  return (
    <section style={{ padding: '40px 15px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Tiêu đề mục */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '30px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '1px' }}>{title}</h2>
        <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: '#888', fontWeight: '600' }}>
          {subCats.map(cat => (
            <span key={cat} style={{ cursor: 'pointer', textTransform: 'uppercase' }}>{cat}</span>
          ))}
        </div>
      </div>

      {/* Lưới sản phẩm */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ backgroundColor: '#F3F3F3', padding: '5px', overflow: 'hidden' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', display: 'block', transition: '0.3s' }} 
                   onError={(e) => e.target.src="https://via.placeholder.com/300x400?text=Binh+Minh+Store"} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#333', height: '32px', overflow: 'hidden' }}>{p.name}</h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#000', margin: '5px 0' }}>{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;