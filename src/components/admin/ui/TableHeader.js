'use client';

/**
 * TableHeader — Common admin table header (3-column grid)
 * Props:
 *   title      {string}    — heading text
 *   icon       {string}    — FontAwesome icon class
 *   badge      {ReactNode} — optional badge (e.g. unread count)
 *   center     {ReactNode} — center slot (filter dropdown etc.)
 *   right      {ReactNode} — right slot (action button etc.)
 */
export default function TableHeader({ title, icon, badge, center, right }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: '15px',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '20px',
      marginBottom: '24px'
    }}>
      {/* Left: Title */}
      <div style={{ justifySelf: 'start' }}>
        <h5 style={{ fontSize: '24px', fontWeight: 'bold', whiteSpace: 'nowrap', margin: 0 }}>
          {icon && <i className={`${icon} me-2`}></i>}
          {title}
          {badge}
        </h5>
      </div>

      {/* Center slot */}
      <div style={{ justifySelf: 'center' }}>
        {center}
      </div>

      {/* Right slot */}
      <div style={{ justifySelf: 'end' }}>
        {right}
      </div>
    </div>
  );
}
