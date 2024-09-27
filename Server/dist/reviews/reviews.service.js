"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./schemas/review.schema");
let ReviewsService = class ReviewsService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    async create(createReviewDto) {
        const createdReview = new this.reviewModel(createReviewDto);
        return createdReview.save();
    }
    async findAll() {
        return this.reviewModel.find().exec();
    }
    async findOne(id) {
        const review = await this.reviewModel.findById(id).exec();
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async update(id, updateReviewDto) {
        const updatedReview = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true });
        if (!updatedReview) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return updatedReview;
    }
    async remove(id) {
        const deletedReview = await this.reviewModel.findByIdAndDelete(id);
        if (!deletedReview) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return deletedReview;
    }
    async getReviewsByPropertyId(propertyId) {
        try {
            const ReviewsEntries = await this.reviewModel.find({ listing_id: propertyId }).exec();
            if (ReviewsEntries.length === 0) {
                throw new common_1.NotFoundException('Reviews entries not found');
            }
            return ReviewsEntries;
        }
        catch (err) {
            console.error('Error fetching Reviews entries:', err);
            throw new Error('Error fetching Reviews entries');
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map