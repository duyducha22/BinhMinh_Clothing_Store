import React, { useState } from 'react';

const LoginPage = ({ navigate, onLogin }) => {
  const [tab, setTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');

  const setL = (f, v) => setLoginForm(p => ({ ...p, [f]: v }));
  const setR = (f, v) => setRegForm(p => ({ ...p, [f]: v }));

  const handleLogin = () => {
    const e = {};
    if (!loginForm.email.trim()) e.email = 'Vui lòng nhập email';
    if (!loginForm.password) e.password = 'Vui lòng nhập mật khẩu';
    if (Object.keys(e).length) { setErrors(e); return; }
    // Giả lập đăng nhập thành công — App.jsx sẽ xử lý điều hướng
    onLogin({ name: loginForm.email.split('@')[0], email: loginForm.email });
  };

  const handleRegister = () => {
    const e = {};
    if (!regForm.name.trim()) e.rname = 'Vui lòng nhập họ tên';
    if (!regForm.email.trim()) e.remail = 'Vui lòng nhập email';
    if (!regForm.password) e.rpassword = 'Vui lòng nhập mật khẩu';
    if (regForm.password !== regForm.confirm) e.rconfirm = 'Mật khẩu không khớp';
    if (Object.keys(e).length) { setErrors(e); return; }
    onLogin({ name: regForm.name, email: regForm.email });
  };

  const inp = (err) => ({
    width: '100%', padding: '12px 0', border: 'none',
    borderBottom: '1px solid ' + (err ? '#e53935' : '#ddd'),
    outline: 'none', fontSize: 14, background: 'transparent',
    fontFamily: 'inherit', color: '#222', boxSizing: 'border-box',
  });

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5%' }}>
      <div style={{ width: '100%', maxWidth: 440, border: '1px solid #eee', borderRadius: 4 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          {[['login', 'ĐĂNG NHẬP'], ['register', 'ĐĂNG KÝ']].map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setErrors({}); }}
              style={{
                flex: 1, padding: '16px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
                borderBottom: tab === key ? '2px solid #000' : '2px solid transparent',
                color: tab === key ? '#000' : '#888', transition: '.2s',
              }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: '32px 36px' }}>
          {tab === 'login' ? (
            <div>
              <div style={{ marginBottom: 20 }}>
                <input placeholder="Nhập email hoặc Tên đăng nhập" value={loginForm.email}
                  onChange={e => setL('email', e.target.value)} style={inp(errors.email)} />
                {errors.email && <p style={{ color: '#e53935', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div style={{ marginBottom: 24 }}>
                <input type="password" placeholder="Mật khẩu" value={loginForm.password}
                  onChange={e => setL('password', e.target.value)} style={inp(errors.password)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                {errors.password && <p style={{ color: '#e53935', fontSize: 11, marginTop: 4 }}>{errors.password}</p>}
              </div>
              <button onClick={handleLogin}
                style={{ width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: 1 }}>
                ĐĂNG NHẬP
              </button>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
                <span style={{ color: '#1565C0', cursor: 'pointer', textDecoration: 'underline' }}>Quên mật khẩu?</span>
              </p>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#888', margin: '20px 0 16px' }}>Hoặc đăng nhập với</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, padding: '11px', background: '#1877F2', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 900 }}>f</span> Đăng nhập bằng Facebook
                </button>
                <button style={{ flex: 1, padding: '11px', background: '#222', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>G</span> Đăng nhập bằng Google
                </button>
              </div>
            </div>
          ) : (
            <div>
              {[
                { label: 'Họ và tên *', field: 'name', key: 'rname', type: 'text' },
                { label: 'Email *', field: 'email', key: 'remail', type: 'email' },
                { label: 'Mật khẩu *', field: 'password', key: 'rpassword', type: 'password' },
                { label: 'Xác nhận mật khẩu *', field: 'confirm', key: 'rconfirm', type: 'password' },
              ].map(({ label, field, key, type }) => (
                <div key={key} style={{ marginBottom: 18 }}>
                  <input type={type} placeholder={label} value={regForm[field]}
                    onChange={e => setR(field, e.target.value)} style={inp(errors[key])} />
                  {errors[key] && <p style={{ color: '#e53935', fontSize: 11, marginTop: 4 }}>{errors[key]}</p>}
                </div>
              ))}
              <button onClick={handleRegister}
                style={{ width: '100%', padding: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: 1, marginTop: 6 }}>
                ĐĂNG KÝ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;