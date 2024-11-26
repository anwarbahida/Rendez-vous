import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients') // Le nom de la table dans la base de données
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  medicalHistory?: string;
}
