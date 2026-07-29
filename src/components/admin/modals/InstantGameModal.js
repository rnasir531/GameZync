'use client';
import React from 'react';
import InstantGameForm from '../forms/InstantGameForm';

export default function InstantGameModal({
  isOpen,
  isEdit,
  formData,
  setFormData,
  categories,
  handleCheckbox,
  onSubmit,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, overflowY: 'auto' }}>
      <div style={{ background: 'var(--panel-bg, #111)', width: '800px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', margin: '20px 0', overflow: 'hidden' }}>
        <InstantGameForm 
          isEdit={isEdit}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          handleCheckbox={handleCheckbox}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
