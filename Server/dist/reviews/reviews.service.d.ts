import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private reviewModel;
    constructor(reviewModel: Model<Review>);
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, updateReviewDto: CreateReviewDto): Promise<Review>;
    remove(id: string): Promise<Review>;
    getReviewsByPropertyId(propertyId: string): Promise<Review[]>;
}
