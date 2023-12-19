import { IsString } from 'class-validator';

export class AvatarDto {
  @IsString()
  url: string;

  @IsString()
  fileId: string;
}
