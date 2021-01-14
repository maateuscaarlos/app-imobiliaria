import {Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn, ManyToOne} from 'typeorm';
import UserPropriertor from './UserProprietor';
import Image from './Images'

@Entity('properties')
export default class Properties{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name:string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions:string;

    @ManyToOne(()=>UserPropriertor, userPropriertor=>userPropriertor.id)
    @JoinColumn({name:'userPropriertor_id'})
    userPropriertor_id:UserPropriertor;

    @OneToMany(()=>Image, image=>image.propertieKeyForeign,{cascade:['insert', 'update'],})
    @JoinColumn({name:'proprietor_id'})
    images: Image[];
}