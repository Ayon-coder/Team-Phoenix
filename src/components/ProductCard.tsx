import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, User, Star, MessageCircle } from "lucide-react";
import { getAverageRating } from "@/lib/storage";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  datePosted: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const sellerId = `seller_${product.seller.replace(/\s/g, "_")}`;

  useEffect(() => {
    setRating(getAverageRating(sellerId));
  }, [sellerId]);

  return (
    <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{product.seller}</span>
          </div>
          {rating.count > 0 && (
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-3 w-3 fill-accent" />
              <span className="font-medium">{rating.average.toFixed(1)}</span>
              <span className="text-muted-foreground">({rating.count})</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <Calendar className="h-3 w-3" />
          <span>{product.datePosted}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <span className="text-2xl font-bold text-primary">${product.price}</span>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/chat/${product.id}`}>
              <MessageCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to={`/product/${product.id}`}>View</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
