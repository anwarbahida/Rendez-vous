import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { medecin } from '../medecin/medecin.entity';

@Entity()
export class RendezVous {

    @PrimaryGeneratedColumn('uuid')
    id: string;  // id de type UUID

    @Column({ type: 'date' })
    date: string;  // Ou 'Date' si vous utilisez un objet Date

    @Column({ type: 'time' })
    heure: string;  // Ou 'Date' si vous utilisez un objet Date

    @ManyToOne(() => Patient, (patient) => patient.rendezVous, { eager: true })
    patient: Patient;

    @ManyToOne(() => medecin, (medecin) => medecin.rendezVous, { eager: true })
    medecin: medecin;

    @Column()
    statut: string ; // en attente, confirmé, annulé
}
