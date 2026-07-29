'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const RequestsTableClient = dynamic(() => import('@/components/admin/tables/RequestsTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });
const MessagesTableClient = dynamic(() => import('@/components/admin/tables/MessagesTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });
const ReviewsTableClient = dynamic(() => import('@/components/admin/tables/ReviewsTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });

export default function ReviewsTabsClient({ requests, messages, reviews, categories, unreadRequestsCount, unreadMessagesCount }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Request Games', icon: 'fa-bullhorn', badge: unreadRequestsCount },
    { name: 'Contact Messages', icon: 'fa-envelope', badge: unreadMessagesCount },
    { name: 'Review Games', icon: 'fa-shield-halved', badge: reviews.length }
  ];

  return (
    <div className="container-fluid p-0" style={{ color: '#cbd5e1' }}>
      
      {/* 3D Dashboard Header/Tabs */}
      <div className="dashboard-panel" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'var(--text-color)', margin: 0 }}>
            <i className="fa-solid fa-inbox text-primary me-2"></i> User Inputs & Reviews
          </h3>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-outline-primary" 
            style={{ borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.color = '#10b981'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; e.currentTarget.style.color = '#10b981'; }}
          >
            <i className="fa-solid fa-rotate-right"></i> Refresh Data
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`btn ${activeTab === idx ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === idx ? 'var(--primary-gradient)' : 'var(--search-bg)',
                color: activeTab === idx ? '#fff' : 'var(--text-color)',
                boxShadow: activeTab === idx ? 'inset 1px 1px 2px rgba(255,255,255,0.3), inset -1px -2px 3px rgba(0,0,0,0.3), 0 4px 10px var(--primary-glow)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i> 
              {tab.name}
              {tab.badge > 0 && (
                <span style={{ 
                  background: activeTab === idx ? 'rgba(255,255,255,0.2)' : 'rgba(239, 68, 68, 0.1)', 
                  color: activeTab === idx ? '#fff' : '#ef4444', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  marginLeft: '4px'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{ minHeight: '400px' }}>
        {activeTab === 0 && (
          <div className="fade-in">
            <RequestsTableClient requests={requests} categories={categories} unreadCount={unreadRequestsCount} />
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="fade-in">
            <MessagesTableClient messages={messages} unreadCount={unreadMessagesCount} />
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="fade-in">
            <ReviewsTableClient reviews={reviews} categories={categories} />
          </div>
        )}
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
