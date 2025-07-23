import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'access token',
    example: '1235566',
  })
  acceseToken: string;
}
