import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, Calendar, User, Shield, Star } from "lucide-react";
import { products } from "@/data/products";
import ReviewSection from "@/components/ReviewSection";
import { getAverageRating } from "@/lib/storage";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [rating, setRating] = useState({ average: 0, count: 0 });

  useEffect(() => {
    if (product) {
      const sellerId = `seller_${product.seller.replace(/\s/g, "_")}`;
      setRating(getAverageRating(sellerId));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted shadow-card">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              <span className="text-muted-foreground">one-time</span>
            </div>

            <Separator />

            {/* Seller Info */}
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {product.seller.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{product.seller}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Shield className="h-3 w-3 text-accent" />
                        <span>Verified Student</span>
                      </div>
                      {rating.count > 0 && (
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="h-3 w-3 fill-accent" />
                          <span className="font-medium">{rating.average.toFixed(1)}</span>
                          <span className="text-muted-foreground">({rating.count})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Posted {product.datePosted}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Individual</span>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild variant="hero" size="lg" className="w-full text-base">
                <Link to={`/chat/${product.id}`}>
                  <MessageCircle className="h-5 w-5" />
                  Message Seller
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full text-base">
                Save for Later
              </Button>
            </div>

            {/* Safety Notice */}
            <Card className="p-4 bg-accent/5 border-accent/20">
              <p className="text-sm text-foreground">
                <strong className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-accent" />
                  Safety Tips
                </strong>
                Always meet in public campus locations. Verify student ID before transactions. 
                Report any suspicious activity to campus security.
              </p>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <ReviewSection 
            productId={product.id} 
            sellerId={`seller_${product.seller.replace(/\s/g, "_")}`}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
