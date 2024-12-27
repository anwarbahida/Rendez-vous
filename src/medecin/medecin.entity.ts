
import { Entity, Column, OneToMany,PrimaryGeneratedColumn } from 'typeorm';
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
  password:String

  @Column({ type: 'blob', nullable: true }) // Utilisation de bytea pour stocker des données binaires
  diplomaPhoto: Buffer;

  @OneToMany(() => RendezVous, (rendezVous) => rendezVous.medecin)
  rendezVous: RendezVous[];
}
