import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { IsDate, IsEmail , IsNumber, IsString, Length} from 'class-validator';
import { RendezVous } from '../rendez_vous/rendez_vous.entity';


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
  @IsString()
  phone: string;

  @Column({ type: 'date' })
  @IsString()
  birthDate: Date;
  
  @Column()
  @IsString()
  password: string;

  @OneToMany(() => RendezVous, (rendezVous) => rendezVous.patient)
  rendezVous: RendezVous[];
}