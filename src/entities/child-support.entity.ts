import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';

@Entity()
export class ChildSupport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paidDate: Date;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Family, (family) => family.childSupports)
  family: Family;
}
