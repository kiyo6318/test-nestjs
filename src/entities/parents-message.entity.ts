import { ParentsMessageType } from 'src/parentsMessages/parents-message-type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';
import { Parent } from './parent.entity';

@Entity()
export class ParentsMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, default: {} })
  text: string[];

  @Column()
  isReplied: boolean;

  @Column()
  isReplyRequired: boolean;

  @Column()
  type: ParentsMessageType;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Parent, (parent) => parent.parentsMessages)
  sender: Parent;

  @ManyToOne(() => Family, (family) => family.parentsMessages)
  family: Family;
}
