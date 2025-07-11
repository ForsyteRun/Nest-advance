import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int', name: 'user_note' })
  note: number;

  @Column({ default: false, nullable: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
