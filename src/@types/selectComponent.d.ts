export type Items = Array<{
  name: string;
  id: number;
  children: Array<{ name: string; id: number }>;
}>;
