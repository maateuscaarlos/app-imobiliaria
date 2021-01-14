import {Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn} from 'typeorm';
import Propertie from './Propertie';


@Entity('usersPropiertor')
export default  class UserProprietor{
    
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name: string;

    @Column()
    telephone: string;

    @Column()
    email: string;
  
    @Column()
    password: string;  

    @OneToMany(()=>Propertie, propertie=>propertie.userPropriertor_id,{cascade:['insert', 'update'],})
    @JoinColumn({name:'propertie_id'})
    properties:Propertie[];

}