import { create } from 'zustand';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface BlogFilterState {
  search: string;
  category: string | null;
  author: string | null;
  dateRange: DateRange;
  setSearch: (search: string) => void;
  setCategory: (category: string | null) => void;
  setAuthor: (author: string | null) => void;
  setDateRange: (range: DateRange) => void;
}

export const useBlogFilterStore = create<BlogFilterState>((set) => ({
  search: '',
  category: null,
  author: null,
  dateRange: { from: null, to: null },
  setSearch: (search) => set(() => ({ search })),
  setCategory: (category) => set(() => ({ category })),
  setAuthor: (author) => set(() => ({ author })),
  setDateRange: (range) => set(() => ({ dateRange: range })),
}));
