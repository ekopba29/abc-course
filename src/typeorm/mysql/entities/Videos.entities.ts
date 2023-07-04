import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'videos' })
export class Videos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

}