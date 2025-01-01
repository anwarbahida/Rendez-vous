import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RendezVous } from '../rendez_vous/rendez_vous.entity';

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
  password: string;

  @Column({ nullable: true }) // Champ optionnel
  photo: string; // URL de la photo

  @OneToMany(() => RendezVous, (rendezVous) => rendezVous.medecin)
  rendezVous: RendezVous[];
}
