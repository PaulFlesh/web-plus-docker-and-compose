import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './../../users/entities/user.entity';
import { Wish } from './../../wishes/entities/wish.entity';
import { BaseEntity } from 'src/common/entity/BaseEntity.entity';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  amount: number;

  @Column({
    default: false,
  })
  hidden: boolean;
}
