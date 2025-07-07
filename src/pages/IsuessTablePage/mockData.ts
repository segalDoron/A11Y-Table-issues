export type GenericRow = Record<string, unknown>;

  
export const mockData: GenericRow[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    email: `item${i + 1}@example.com`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    createdAt: new Date(2023, 0, (i % 30) + 1).toISOString(),
    count: Math.floor(Math.random() * 100),
}));
  