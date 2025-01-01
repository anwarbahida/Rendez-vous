import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InfirmierDeBureau {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  password: string;
  @Column()
  roles : string
}
