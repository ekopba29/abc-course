import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'membership_types' })
export class MembershipType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
 
}