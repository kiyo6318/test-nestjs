import { FamilyStatus } from 'src/families/family-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChildMemo } from './child-memo.entity';
import { ChildSupport } from './child-support.entity';
import { Parent } from './parent.entity';
import { ParentsMessage } from './parents-message.entity';
import { VisitationPossibleDate } from './visitation-possible-date.entity';
import { Visitation } from './visitation.entity';

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
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Parent, (parent) => parent.family)
  parents: Parent[];

  @OneToMany(() => ParentsMessage, (parentsMessage) => parentsMessage.family)
  parentsMessages: ParentsMessage[];

  @OneToMany(() => ChildSupport, (childSupport) => childSupport.family)
  childSupports: ChildSupport[];

  @OneToMany(
    () => VisitationPossibleDate,
    (visitationPossibleDate) => visitationPossibleDate.family,
  )
  visitationPossibleDates: VisitationPossibleDate[];

  @OneToMany(() => Visitation, (visitation) => visitation.family)
  visitations: Visitation[];

  @OneToMany(() => ChildMemo, (childMemo) => childMemo.family)
  childMemos: ChildMemo[];
}
