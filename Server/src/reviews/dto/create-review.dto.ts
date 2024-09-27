import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateReviewDto {
  @IsDate()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  readonly listing_id: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewer_id: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewer_name: string;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
