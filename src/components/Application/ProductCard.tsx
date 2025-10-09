import React from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    url: string;
    price: number;
    email: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <div>ProductCard: {product.name}</div>;
};

export default ProductCard;
