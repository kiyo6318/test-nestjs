import { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Family, (family) => family.parents)
  family?: Family[];
}
