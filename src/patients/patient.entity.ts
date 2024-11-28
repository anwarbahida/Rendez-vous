import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsEmail , IsNumber, IsString, Length} from 'class-validator';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @Column()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNumber()
  phone: string;

  @Column({ type: 'date' })
  @IsDate()
  birthDate: string;
}