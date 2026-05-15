// import React, { useState } from 'react';

// const TINH_THANH = ['Hà Nội','TP. Hồ Chí Minh','Đà Nẵng','Hải Phòng','Cần Thơ','Bắc Ninh','Thanh Hóa','Nghệ An','Thái Nguyên','Bình Dương'];
// const QUAN_HUYEN = {
//   'Hà Nội': ['Hoàn Kiếm','Đống Đa','Hai Bà Trưng','Cầu Giấy','Hà Đông','Bắc Từ Liêm'],
//   'TP. Hồ Chí Minh': ['Quận 1','Quận 3','Bình Thạnh','Gò Vấp','Tân Bình'],
// };
// const PHUONG_XA = {
//   'Hoàn Kiếm': ['Hàng Bạc','Hàng Bồ','Hàng Đào','Lý Thái Tổ'],
//   'Đống Đa': ['Cát Linh','Hàng Bột','Khâm Thiên','Láng Hạ'],
// };

// const EditProfilePage = ({ user, onUpdateUser, navigate }) => {
//   const [form, setForm] = useState({
//     name: user?.name || '', dob: '', phone: '', email: user?.email || '',
//     tinh: '', huyen: '', phuong: '', address: '',
//   });
//   const [saved, setSaved] = useState(false);
//   const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

//   const handleSave = () => {
//     if (onUpdateUser) onUpdateUser({ ...user, name: form.name, email: form.email });
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };

//   const fieldStyle = {
//     width: '100%', padding: '10px 12px', border: '1px solid #ddd',
//     fontSize: 13, outline: 'none', borderRadius: 4, boxSizing: 'border-box',
//     fontFamily: 'inherit', color: '#222',
//   };
//   const labelStyle = { fontSize: 13, color: '#444', textAlign: 'right', paddingTop: 10, paddingRight: 20 };

//   const Row = ({ label, children }) => (
//     <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0, marginBottom: 16, alignItems: 'start' }}>
//       <span style={labelStyle}>{label}</span>
//       <div>{children}</div>
//     </div>
//   );

//   return (
//     <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 5% 80px', fontFamily: "'Segoe UI', sans-serif" }}>
//       <h1 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: '#111' }}>Thông tin cá nhân</h1>

//       <Row label="Họ tên:">
//         <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Họ và tên" style={fieldStyle} />
//       </Row>
//       <Row label="Ngày sinh:">
//         <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} placeholder="Ngày sinh" style={fieldStyle} />
//       </Row>
//       <Row label="Điện thoại:">
//         <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Điện thoại" style={fieldStyle} />
//       </Row>
//       <Row label="Email:">
//         <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email" style={fieldStyle} />
//       </Row>
//       <Row label="Tỉnh/Thành phố :">
//         <select value={form.tinh} onChange={e => { set('tinh', e.target.value); set('huyen',''); set('phuong',''); }} style={{ ...fieldStyle, cursor: 'pointer' }}>
//           <option value="">Chọn Tỉnh/ thành phố</option>
//           {TINH_THANH.map(t => <option key={t} value={t}>{t}</option>)}
//         </select>
//       </Row>
//       <Row label="Quận/Huyện:">
//         <select value={form.huyen} onChange={e => { set('huyen', e.target.value); set('phuong',''); }} style={{ ...fieldStyle, cursor: 'pointer' }}>
//           <option value="">Chọn Quận/ Huyện</option>
//           {(QUAN_HUYEN[form.tinh] || []).map(q => <option key={q} value={q}>{q}</option>)}
//         </select>
//       </Row>
//       <Row label="Phường xã :">
//         <select value={form.phuong} onChange={e => set('phuong', e.target.value)} style={{ ...fieldStyle, cursor: 'pointer' }}>
//           <option value="">Chọn Phường/ Xã</option>
//           {(PHUONG_XA[form.huyen] || []).map(p => <option key={p} value={p}>{p}</option>)}
//         </select>
//       </Row>
//       <Row label="Địa chỉ chi tiết:">
//         <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="Địa chỉ chi tiết" style={fieldStyle} />
//       </Row>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
//         <button onClick={handleSave}
//           style={{ padding: '11px 32px', background: saved ? '#555' : '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 2, transition: '.2s' }}>
//           {saved ? '✓ Đã lưu' : 'Cập nhật'}
//         </button>
//         <button onClick={() => navigate('/account')}
//           style={{ padding: '11px 32px', background: '#fff', color: '#444', border: '1px solid #ddd', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 2 }}>
//           Quay lại
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;




import React, { useState } from 'react';
import api from '../api/api';

const TINH_THANH = ['Hà Nội','TP. Hồ Chí Minh','Đà Nẵng','Hải Phòng','Cần Thơ','Bắc Ninh','Thanh Hóa','Nghệ An','Thái Nguyên','Bình Dương'];
const QUAN_HUYEN = {
  'Hà Nội': ['Hoàn Kiếm','Đống Đa','Hai Bà Trưng','Cầu Giấy','Hà Đông','Bắc Từ Liêm'],
  'TP. Hồ Chí Minh': ['Quận 1','Quận 3','Bình Thạnh','Gò Vấp','Tân Bình'],
};
const PHUONG_XA = {
  'Hoàn Kiếm': ['Hàng Bạc','Hàng Bồ','Hàng Đào','Lý Thái Tổ'],
  'Đống Đa': ['Cát Linh','Hàng Bột','Khâm Thiên','Láng Hạ'],
};

const EditProfilePage = ({ user, onUpdateUser, navigate }) => {
  const [form, setForm] = useState({
    name: user?.name || '', 
    dob: user?.dob || '', 
    phone: user?.phone || '', 
    email: user?.email || '',
    tinh: user?.tinh || '', 
    huyen: user?.huyen || '', 
    phuong: user?.phuong || '', 
    address: user?.address || '',
  });
  
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Gửi dữ liệu cập nhật lên Backend
      const { data } = await api.put('/api/customers/profile', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        tinh: form.tinh,
        huyen: form.huyen,
        phuong: form.phuong,
        address: form.address,
      });

      // Cập nhật state ở App.jsx
      if (onUpdateUser) onUpdateUser(data);
      
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật thông tin. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: '100%', padding: '10px 12px', border: '1px solid #ddd',
    fontSize: 13, outline: 'none', borderRadius: 4, boxSizing: 'border-box',
    fontFamily: 'inherit', color: '#222',
  };
  const labelStyle = { fontSize: 13, color: '#444', textAlign: 'right', paddingTop: 10, paddingRight: 20 };

  const Row = ({ label, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0, marginBottom: 16, alignItems: 'start' }}>
      <span style={labelStyle}>{label}</span>
      <div>{children}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 5% 80px', fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: '#111' }}>Thông tin cá nhân</h1>

      {error && <p style={{ color: '#e53935', textAlign: 'center', fontSize: 13, marginBottom: 16 }}>{error}</p>}

      <Row label="Họ tên:">
        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Họ và tên" style={fieldStyle} />
      </Row>
      <Row label="Ngày sinh:">
        <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} placeholder="Ngày sinh" style={fieldStyle} />
      </Row>
      <Row label="Điện thoại:">
        <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Điện thoại" style={fieldStyle} />
      </Row>
      <Row label="Email:">
        <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="Email" style={fieldStyle} />
      </Row>
      <Row label="Tỉnh/Thành phố :">
        <select value={form.tinh} onChange={e => { set('tinh', e.target.value); set('huyen',''); set('phuong',''); }} style={{ ...fieldStyle, cursor: 'pointer' }}>
          <option value="">Chọn Tỉnh/ thành phố</option>
          {TINH_THANH.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Row>
      <Row label="Quận/Huyện:">
        <select value={form.huyen} onChange={e => { set('huyen', e.target.value); set('phuong',''); }} style={{ ...fieldStyle, cursor: 'pointer' }}>
          <option value="">Chọn Quận/ Huyện</option>
          {(QUAN_HUYEN[form.tinh] || []).map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </Row>
      <Row label="Phường xã :">
        <select value={form.phuong} onChange={e => set('phuong', e.target.value)} style={{ ...fieldStyle, cursor: 'pointer' }}>
          <option value="">Chọn Phường/ Xã</option>
          {(PHUONG_XA[form.huyen] || []).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </Row>
      <Row label="Địa chỉ chi tiết:">
        <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="Địa chỉ chi tiết" style={fieldStyle} />
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
        <button onClick={handleSave} disabled={loading}
          style={{ padding: '11px 32px', background: saved ? '#555' : '#333', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 2, transition: '.2s' }}>
          {loading ? 'Đang xử lý...' : (saved ? '✓ Đã lưu' : 'Cập nhật')}
        </button>
        <button onClick={() => navigate('/account')}
          style={{ padding: '11px 32px', background: '#fff', color: '#444', border: '1px solid #ddd', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 2 }}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;