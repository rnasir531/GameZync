'use client';
import { useState } from 'react';
import SystemControlsSettings from './forms/SystemControlsSettings';
import AppearanceSettings from './forms/AppearanceSettings';
import SeoSettings from './forms/SeoSettings';
import ContactSettings from './forms/ContactSettings';

export default function GeneralSettingsForm({ settings, handleChange }) {
  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fieldName === 'seo_og_image') setUploadingOgImage(true);
    if (fieldName === 'appearance_logo') setUploadingLogo(true);
    if (fieldName === 'appearance_favicon') setUploadingFavicon(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const syntheticEvent = {
          target: { name: fieldName, value: data.url, type: 'text' }
        };
        handleChange(syntheticEvent);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during upload.');
    } finally {
      if (fieldName === 'seo_og_image') setUploadingOgImage(false);
      if (fieldName === 'appearance_logo') setUploadingLogo(false);
      if (fieldName === 'appearance_favicon') setUploadingFavicon(false);
    }
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
    gap: '1px',
    background: 'rgba(255,255,255,0.05)',
  };

  const leftPanelStyle = {
    background: 'rgba(0,0,0,0.15)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px'
  };

  const rightPanelStyle = {
    background: 'rgba(0,0,0,0.25)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <SystemControlsSettings settings={settings} handleChange={handleChange} />
      
      <AppearanceSettings 
        settings={settings} 
        handleChange={handleChange} 
        handleFileUpload={handleFileUpload}
        uploadingFavicon={uploadingFavicon}
        uploadingLogo={uploadingLogo}
        gridContainerStyle={gridContainerStyle}
        leftPanelStyle={leftPanelStyle}
        rightPanelStyle={rightPanelStyle}
      />
      
      <SeoSettings 
        settings={settings} 
        handleChange={handleChange} 
        handleFileUpload={handleFileUpload}
        uploadingOgImage={uploadingOgImage}
        gridContainerStyle={gridContainerStyle}
        leftPanelStyle={leftPanelStyle}
        rightPanelStyle={rightPanelStyle}
      />
      
      <ContactSettings settings={settings} handleChange={handleChange} />
    </div>
  );
}
