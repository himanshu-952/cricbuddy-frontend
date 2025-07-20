import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} className="form-container">
      <h2>Register</h2>
      <input className='form-group'
        type="text"
        placeholder="Username"
        value={form.username}
        required
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input  className='form-group'
        type="email"
        placeholder="Email"
        value={form.email}
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input  className='form-group'
        type="password"
        placeholder="Password"
        value={form.password}
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
