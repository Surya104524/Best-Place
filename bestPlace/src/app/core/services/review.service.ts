import { Injectable, signal, inject } from '@angular/core';
import { Review, RatingBreakdown } from '../models/review.model';
import { MOCK_REVIEWS } from '../mock-data/reviews.mock';
import { ToastService } from './toast.service';

const REVIEWS_STORAGE_KEY = 'best_place_user_reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly toast = inject(ToastService);
  private readonly reviewsSignal = signal<Review[]>(this.loadInitialReviews());
  public readonly reviews = this.reviewsSignal.asReadonly();

  private loadInitialReviews(): Review[] {
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const userReviews: Review[] = stored ? JSON.parse(stored) : [];
      return [...userReviews, ...MOCK_REVIEWS];
    } catch {
      return MOCK_REVIEWS;
    }
  }

  public getReviewsForPlace(placeId: string): Review[] {
    return this.reviewsSignal().filter((r) => r.placeId === placeId);
  }

  public getRatingBreakdown(placeId: string, baseRating = 4.9): RatingBreakdown {
    const placeReviews = this.getReviewsForPlace(placeId);
    const count = placeReviews.length || 1;

    const starsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    placeReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      starsCount[star]++;
    });

    // If no reviews, give realistic distribution
    if (placeReviews.length === 0) {
      starsCount[5] = 18;
      starsCount[4] = 4;
      starsCount[3] = 1;
    }

    return {
      overall: baseRating,
      ambience: 4.9,
      quality: 4.9,
      service: 4.8,
      value: 4.7,
      starsCount
    };
  }

  public addReview(
    placeId: string,
    authorName: string,
    rating: number,
    content: string,
    visitType: Review['visitType'] = 'Solo',
    photos?: string[]
  ): Review {
    const newReview: Review = {
      id: 'rev_' + Date.now(),
      placeId,
      authorName: authorName.trim() || 'Anonymous Explorer',
      authorAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName)}`,
      isVerifiedVisit: true,
      visitType,
      rating,
      date: 'Just now',
      content,
      photos: photos && photos.length > 0 ? photos : undefined,
      helpfulCount: 0
    };

    this.reviewsSignal.update((list) => [newReview, ...list]);

    // Save user's submitted reviews to localStorage
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const userReviews: Review[] = stored ? JSON.parse(stored) : [];
      userReviews.unshift(newReview);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(userReviews));
    } catch (err) {
      console.warn('Could not persist review', err);
    }

    this.toast.success('Review Published!', 'Thank you for sharing your curated insight with the community.');
    return newReview;
  }

  public upvoteHelpful(reviewId: string): void {
    this.reviewsSignal.update((list) =>
      list.map((r) => {
        if (r.id === reviewId) {
          if (r.isHelpfulClicked) {
            return { ...r, helpfulCount: r.helpfulCount - 1, isHelpfulClicked: false };
          } else {
            return { ...r, helpfulCount: r.helpfulCount + 1, isHelpfulClicked: true };
          }
        }
        return r;
      })
    );
  }
}
