import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './family.entity';
import { Parent } from './parent.entity';

@Entity()
export class ChildMemo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => Parent, (parent) => parent.childMemos)
  writer: Parent;

  @ManyToOne(() => Family, (family) => family.childMemos)
  family: Family;
}
