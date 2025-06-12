import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { Portfolio } from '@portfolios/entities/portfolio.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
} 