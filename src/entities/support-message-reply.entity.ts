import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SupportMessage } from './support-message.entity';
import { Supporter } from './supporter.entity';

@Entity()
export class SupportMessageReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  isConfirmed: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => SupportMessage, (supportMessage) => supportMessage.replies)
  message: SupportMessage;

  @ManyToOne(() => Supporter, (supporter) => supporter.messageReplies)
  supporter: Supporter;
}
