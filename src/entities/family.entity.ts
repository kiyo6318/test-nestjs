import { FamilyStatus } from 'src/families/family-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Family {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  meetFrequency: number;

  @Column()
  paymentDueDate: number;

  @Column()
  possibleDateSelectDay: number;

  @Column()
  status: FamilyStatus;

  @Column()
  cohabitParentId: string;

  @Column()
  separateParentId: string;

  @Column()
  supporterId: string;

  @Column()
  supportOrganizationId: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
