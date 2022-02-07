import { ParentStatus } from 'src/auth/parent-status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChildMemo } from './child-memo.entity';
import { Family } from './family.entity';
import { Organization } from './organization.entity';
import { ParentsMessage } from './parents-message.entity';
import { SupportMessage } from './support-message.entity';
import { Supporter } from './supporter.entity';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  status: ParentStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Family, (family) => family.parents)
  family: Family;

  @ManyToOne(() => Supporter, (supporter) => supporter.customers)
  supporter: Supporter;

  @ManyToOne(() => Organization, (organization) => organization.customers)
  supportOrganization: Organization;

  @OneToMany(() => ParentsMessage, (parentMessage) => parentMessage.sender)
  parentsMessages: ParentsMessage[];

  @OneToMany(() => ChildMemo, (childMemo) => childMemo.writer)
  childMemos: ChildMemo[];

  @OneToMany(() => SupportMessage, (supportMessage) => supportMessage.parent)
  supportMessages: SupportMessage[];
}
