import { Review } from "@/types";
import { Card } from "@/components/ui/card";
import { Star, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { deleteReview, updateReview, getCurrentUser } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ReviewCardProps {
  review: Review;
  onUpdate: () => void;
}

const ReviewCard = ({ review, onUpdate }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.rating);
  const currentUser = getCurrentUser();
  const { toast } = useToast();
  const isOwner = currentUser.id === review.reviewerId;

  const handleDelete = () => {
    deleteReview(review.id);
    toast({ title: "Review deleted successfully" });
    onUpdate();
  };

  const handleUpdate = () => {
    updateReview(review.id, { comment: editedComment, rating: editedRating });
    setIsEditing(false);
    toast({ title: "Review updated successfully" });
    onUpdate();
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-accent text-accent" : "text-muted"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setEditedRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground">{review.reviewerName}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(review.timestamp).toLocaleDateString()}
          </p>
        </div>
        {isOwner && !isEditing && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {renderStars(editedRating, true)}
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleUpdate}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-2">{renderStars(review.rating)}</div>
          <p className="text-sm text-foreground">{review.comment}</p>
        </>
      )}
    </Card>
  );
};

export default ReviewCard;
