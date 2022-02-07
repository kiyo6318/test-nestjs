import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Organization } from './organization.entity';
import { Parent } from './parent.entity';
import { SupportMessageReply } from './support-message-reply.entity';
import { Supporter } from './supporter.entity';

@Entity()
export class SupportMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  isReplied: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(
    () => SupportMessageReply,
    (supportMessageReply) => supportMessageReply.message,
  )
  replies: SupportMessage[];

  @ManyToOne(() => Parent, (parent) => parent.supportMessages)
  parent: Parent;

  @ManyToOne(() => Supporter, (supporter) => supporter.supportMessages)
  supporter: Supporter;

  @ManyToOne(() => Organization, (organization) => organization.supportMessages)
  organization: Organization;
}
