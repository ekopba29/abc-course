import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Articles } from './Articles.entities';

@Entity({ name: 'user_articles' })
export class UserArticle {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  article_id: number;

  @ManyToOne(() => Articles)
  @JoinColumn({name:'article_id'})
  article: Articles

}