import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsFQDN, IsInt, IsPositive } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Offer } from './../../offers/entities/offer.entity';
import { BaseEntity } from 'src/common/entity/BaseEntity.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsFQDN()
  link: string;

  @Column()
  @IsFQDN()
  image: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({
    default: 0,
  })
  @IsInt()
  @IsPositive()
  copied: number;
}
