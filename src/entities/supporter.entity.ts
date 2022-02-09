import { Exclude } from 'class-transformer';
import { SupporterStatus } from 'src/supporters/supporter-status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { Parent } from './parent.entity';
import { SupportMessageReply } from './support-message-reply.entity';
import { SupportMessage } from './support-message.entity';

@Entity()
export class Supporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: SupporterStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Organization, (organization) => organization.supporters)
  organization: Organization;

  @Column()
  organizationId: string;

  @OneToMany(() => Parent, (parent) => parent.supporter)
  customers: Parent[];

  @OneToMany(() => SupportMessage, (supportMessage) => supportMessage.supporter)
  supportMessages: SupportMessage[];

  @OneToMany(
    () => SupportMessageReply,
    (supportMessageReply) => supportMessageReply.supporter,
  )
  messageReplies: SupportMessageReply[];
}
