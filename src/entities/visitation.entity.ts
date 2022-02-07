import { VisitationStatus } from 'src/visitations/visitation-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';

@Entity()
export class Visitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  status: VisitationStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Family, (family) => family.visitations)
  family: Family;
}
