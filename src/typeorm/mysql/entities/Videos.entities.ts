import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserVideos } from './UserVideos.entities';

@Entity({ name: 'videos' })
export class Videos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

}