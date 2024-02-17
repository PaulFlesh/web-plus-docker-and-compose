import { Entity, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Length, IsFQDN } from 'class-validator';
import { User } from './../../users/entities/user.entity';
import { Wish } from './../../wishes/entities/wish.entity';
import { BaseEntity } from 'src/common/entity/BaseEntity.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({
    default: '',
  })
  @Length(0, 1500)
  description: string;

  @Column()
  @IsFQDN()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
