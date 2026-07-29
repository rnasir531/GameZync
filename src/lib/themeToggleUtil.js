'use client';

export function animateThemeToggle(event, currentTheme, setThemeCallback) {
  const btn = event.currentTarget;
  
  // Add 3D icon spin animation class to button icon
  const icon = btn.querySelector('i');
  if (icon) {
    icon.classList.remove('theme-toggle-spin');
    // Trigger reflow to restart animation if clicked quickly
    void icon.offsetWidth;
    icon.classList.add('theme-toggle-spin');
    setTimeout(() => {
      icon.classList.remove('theme-toggle-spin');
    }, 450);
  }

  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Instant clean theme switch (CSS handles smooth 0.3s color cross-fade)
  if (nextTheme === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    if (setThemeCallback) setThemeCallback('dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    if (setThemeCallback) setThemeCallback('light');
  }
}
