import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import Propertie from './Propertie';


@Entity('images')
export default class Images{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=>Propertie, propertie=>propertie.images)
    @JoinColumn({name:'propertie_id'})
    propertieKeyForeign:Propertie;
}
