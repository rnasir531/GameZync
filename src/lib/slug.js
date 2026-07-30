export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getGameUrl(game) {
  if (!game || (!game.id && game.id !== 0)) return '/library';
  const name = game.name || game.title || '';
  const slug = slugify(name);
  return slug ? `/game/${game.id}-${slug}` : `/game/${game.id}`;
}

export function getInstantGameUrl(game) {
  if (!game || (!game.id && game.id !== 0)) return '/instant';
  const title = game.title || game.name || '';
  const slug = slugify(title);
  return slug ? `/instant/${game.id}-${slug}` : `/instant/${game.id}`;
}
