import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'membership_item_types' })
export class MembershipItemType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_video: number;

  @Column()
  total_article: number;

  @Column({ default: 0 })
  unlimited_video: boolean;

  @Column({ default: 0 })
  unlimited_article: boolean;

  @Column({ default: null })
  no_video: boolean;

  @Column({ default: null })
  no_article: boolean;

  @Column()
  membership_type_id: number

}