export class TaskEntity {
  //   @PrimaryGeneratedColumn()
  //   id: number;
  //   @Column({ type: 'varchar' })
  //   title: string;
  //   @Column({ type: 'int', name: 'user_note' })
  //   note: number;
  //   @Column({ default: false, nullable: true })
  //   isPublic: boolean;
  //   @OneToMany(() => ReviewEntity, (review) => review.task)
  //   reviews: ReviewEntity[];
  //   @ManyToMany(() => ExecutorEntity, (executor) => executor.tasks)
  //   @JoinTable({
  //     name: 'task_executors',
  //     joinColumn: { name: 'executor_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' },
  //   })
  //   executors: ExecutorEntity[];
  //   @CreateDateColumn()
  //   createdAt: Date;
  //   @UpdateDateColumn()
  //   updatedAt: Date;
}
