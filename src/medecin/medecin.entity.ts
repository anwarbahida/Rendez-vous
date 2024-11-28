
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class medecin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
 
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  birthDate: string;
  @Column()
  password:String
}
