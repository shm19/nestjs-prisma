import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserOrderByDto implements Prisma.UserOrderByWithRelationInput {
  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  email?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  name?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  createdAt?: 'asc' | 'desc';
}
