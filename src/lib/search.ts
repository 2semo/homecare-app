import type { Service } from '../types/service';

export function filterServices(services: Service[], query: string): Service[] {
  const q = query.trim().toLowerCase();
  if (q === '') return services;
  return services.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
