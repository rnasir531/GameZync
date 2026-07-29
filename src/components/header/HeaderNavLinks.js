'use client';
import Link from 'next/link';

export default function HeaderNavLinks({ navItems, isActive }) {
  return (
    <nav className="topbar-nav d-none d-lg-flex">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          href={item.path} 
          className={`topbar-nav-link ${isActive(item.path)}`}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
