import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/ReviewCard";
import { getProductReviews, saveReview, getCurrentUser } from "@/lib/storage";
import { Review } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ReviewSectionProps {
  productId: string;
  sellerId: string;
}

const ReviewSection = ({ productId, sellerId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const currentUser = getCurrentUser();
  const { toast } = useToast();

  const loadReviews = () => {
    setReviews(getProductReviews(productId));
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const handleSubmit = () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (!comment.trim()) {
      toast({ title: "Please write a review", variant: "destructive" });
      return;
    }

    saveReview({
      productId,
      sellerId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      rating,
      comment: comment.trim(),
    });

    toast({ title: "Review posted successfully!" });
    setRating(0);
    setComment("");
    setShowForm(false);
    loadReviews();
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Reviews & Ratings
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-xl font-bold text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      <Separator />

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} variant="outline">
          Write a Review
        </Button>
      ) : (
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3">
            Rate this resource
          </h3>
          <div className="space-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating
                      ? "fill-accent text-accent"
                      : "text-muted hover:text-accent"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Share your experience with this resource..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={handleSubmit}>Submit Review</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setRating(0);
                  setComment("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onUpdate={loadReviews}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
