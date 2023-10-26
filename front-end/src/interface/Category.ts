export interface ICategory {
  id?: number;
  name: string;
  image: string;
}

export interface ICategoryTable {
  id: number;
  name: string;
  image: React.ReactNode;
}
