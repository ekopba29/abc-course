import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class Articles {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column()
  title: string;

}