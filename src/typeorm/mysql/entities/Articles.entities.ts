import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class Articles {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

}