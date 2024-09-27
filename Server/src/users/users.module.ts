import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register UserModel
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule], // Export UserService and MongooseModule if used elsewhere
})
export class UserModule {}
