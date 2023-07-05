import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Videos } from './Videos.entities';

@Entity({ name: 'user_videos' })
export class UserVideos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  video_id: number;

  @ManyToOne(() => Videos)
  @JoinColumn({name:'video_id'})
  video: Videos


}