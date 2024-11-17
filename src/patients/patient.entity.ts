import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { isString } from 'util';
import { IsEmail } from 'class-validator';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  birthDate: string;
}