
export interface Products {
  _id: string;
  name: string;
  price: number;
  discountedPrice: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  createdAt: string;
  updatedAt: string;
}
