import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';

@Entity()
export class VisitationPossibleDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date', { array: true, default: {} })
  dates: Date[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Family, (family) => family.visitationPossibleDates)
  family: Family;
}
