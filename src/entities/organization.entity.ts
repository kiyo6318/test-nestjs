import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Parent } from './parent.entity';
import { SupportMessage } from './support-message.entity';
import { Supporter } from './supporter.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Supporter, (supporter) => supporter.organization)
  supporters: Supporter[];

  @OneToMany(() => Parent, (parent) => parent.supportOrganization)
  customers: Parent[];

  @OneToMany(
    () => SupportMessage,
    (supportMessage) => supportMessage.organization,
  )
  supportMessages: SupportMessage[];
}
