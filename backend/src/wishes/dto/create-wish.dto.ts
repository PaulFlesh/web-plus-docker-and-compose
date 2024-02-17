import { Length, IsNotEmpty, IsUrl, Min, IsString } from 'class-validator';
export class CreateWishDto {
  @Length(1, 250)
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
