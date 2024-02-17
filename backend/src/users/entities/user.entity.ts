import { Entity, Column, OneToMany } from 'typeorm';

import { Length, IsEmail, IsFQDN, IsNotEmpty } from 'class-validator';
import { Wish } from './../../wishes/entities/wish.entity';
import { Offer } from './../../offers/entities/offer.entity';
import { Wishlist } from './../../wishlists/entities/wishlist.entity';
import { BaseEntity } from 'src/common/entity/BaseEntity.entity';
@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({
    type: 'varchar',
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsFQDN()
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    select: false,
  })
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.id)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}
