import React from 'react';
import ProductList from '../components/ProductList';
import { productsData } from '../data';

const Home = () => {
  return (
    <>
      {/* BANNER */}
      <section style={{ width: '100%', overflow: 'hidden' }}>
        <img 
          src="/images/banner.jpg" 
          alt="Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </section>

      {/* SẢN PHẨM */}
      <div style={{ padding: '40px 5%' }}>
        <ProductList 
          title="ÁO THU ĐÔNG" 
          subCats={["Áo Nỉ / Áo Thun Dài Tay", "Áo Len", "Áo Khoác"]} 
          products={productsData.thuDong} 
        />
        <ProductList 
          title="ÁO XUÂN HÈ" 
          subCats={["Áo Phông", "Áo Polo", "Áo Sơ Mi Ngắn Tay"]} 
          products={productsData.xuanHe} 
        />
        <ProductList 
          title="QUẦN NAM" 
          subCats={["Quần Dài", "Quần Short"]} 
          products={productsData.quanNam} 
        />
        <ProductList 
          title="PHỤ KIỆN" 
          subCats={["Túi / Balo", "Giày Dép", "Dây Lưng" , "Mũ", "Tất"]} 
          products={productsData.phuKien} 
        />
      </div>
    </>
  );
};

export default Home;