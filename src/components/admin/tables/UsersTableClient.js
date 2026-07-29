'use client';
import { useState } from 'react';
import Link from 'next/link';

import AdminUserModal from '@/components/admin/modals/AdminUserModal';

export default function UsersTableClient({ users = [], currentUserId }) {
  const [userList, setUserList] = useState(users);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role: '1'
  });

  const resetForm = () => setFormData({ id: '', first_name: '', last_name: '', username: '', password: '', role: '1' });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newUser = await res.json();
        setUserList([newUser, ...userList]);
        setIsAddOpen(false);
        resetForm();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to add user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/users/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUserList(userList.map(u => u.id === formData.id ? updatedUser : u));
        setIsEditOpen(false);
        resetForm();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (user) => {
    setFormData({
      id: user.id,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username,
      password: '', // Leave blank, only update if typed
      role: user.role.toString()
    });
    setIsEditOpen(true);
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUserList(userList.filter(u => u.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-panel" style={{ color: '#cbd5e1', padding: '24px' }}>
      <div className="card-header mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', width: '100%' }}>
        <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <i className="fa-solid fa-users me-2"></i> Users List
        </h4>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn btn-light text-primary" style={{ background: '#f8f9fa', color: 'var(--primary-color)', padding: '8px 15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          <i className="fa-solid fa-user-plus me-1"></i> Add New
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-center">
              <th>Full Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr><td colSpan='6' className='text-center p-3' style={{ textAlign: 'center' }}>No users found.</td></tr>
            ) : (
              userList.map(row => (
                <tr key={row.id} className="text-center">
                  <td>
                    {row.first_name} {row.last_name}
                  </td>
                  <td>{row.username}</td>
                  <td>••••••••</td>
                  <td>
                    {row.id === currentUserId ? (
                      <span className="fw-bold" style={{ color: '#10b981' }}>Online</span>
                    ) : (
                      <span className="fw-bold" style={{ color: '#ef4444' }}>Offline</span>
                    )}
                  </td>
                  <td>
                    {row.role === 3 ? (
                      <span className="badge bg-success" style={{ background: '#198754', padding: '5px 10px', borderRadius: '8px' }}>Manager</span>
                    ) : row.role === 2 ? (
                      <span className="badge bg-warning text-dark" style={{ background: '#ffc107', color: '#000', padding: '5px 10px', borderRadius: '8px' }}>Moderate</span>
                    ) : (
                      <span className="badge bg-secondary" style={{ background: '#6c757d', padding: '5px 10px', borderRadius: '8px' }}>Admin</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => openEdit(row)} className="btn btn-sm btn-outline-primary me-2" style={{ color: '#0d6efd', border: '1px solid #0d6efd', padding: '5px 10px', borderRadius: '6px', marginRight: '5px', textDecoration: 'none', background: 'transparent', cursor: 'pointer' }}>
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => deleteUser(row.id)}
                      className="btn btn-sm btn-outline-danger" 
                      style={{ color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminUserModal 
        isOpen={isAddOpen || isEditOpen}
        isEdit={isEditOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={isEditOpen ? handleEditSubmit : handleAddSubmit}
        onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
      />
    </div>
  );
}
