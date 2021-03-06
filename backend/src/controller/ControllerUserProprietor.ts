import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import UserPropriertor from '../models/UserProprietor'
import userPropertie_view from '../views/userPropertie_view';
import bcript from 'bcryptjs';
import Propertie from '../models/Propertie';


const ControllerUserProprietor = {
    async index(request:Request, response:Response):Promise<UserPropriertor|any>{
        const userPropriertorRepository = getRepository(UserPropriertor);
        const users = await userPropriertorRepository.find({
          relations:['properties'],
        });

     //    users.forEach(function(userSelect){
       //     userSelect.properties.forEach(async function(propertieSelect,i){
         //       const propertieRepository = getRepository(Propertie);
           //     const idString = userSelect.id.toString;
             //   const propertie = await propertieRepository.findOneOrFail(propertieSelect,{
               //     relations:['images'],
                 //   where:`idString==='userPropriertor_id`
               // });
                
               // userSelect.properties[i]=propertie;
           // });
       // });

        
        console.log(users);
        return response.status(200).json(userPropertie_view.renderMany(users));
    },
    async show(request:Request, response:Response):Promise<UserPropriertor|any>{
        const {id} = request.params;
        const userPropriertorRepository = getRepository(UserPropriertor);
        const user = await userPropriertorRepository.findOneOrFail(id,{
            relations:['properties'],
          });
        return response.status(200).json(userPropertie_view.render(user));
      },
    async create(request:Request, response:Response):Promise<UserPropriertor | any>{

        const {name,telephone, email, password} = request.body;
        console.log(name,telephone, email, password);
        const userRepository = getRepository(UserPropriertor);

        const dataUser = userRepository.create({
        name,
        telephone, 
        email,
        password, 
        })
       // const schema = Yup.object().shape({
        //    name:Yup.string().trim().required(),
         //   telephone:Yup.string().required(),
         //   email:Yup.string().required(),
       //     password:Yup.string().required()
       //   });
        dataUser.password = bcript.hashSync(dataUser.password);
      //  await schema.validate(dataUser, {
      //      abortEarly:false,
      //    });

        const users = userRepository.create(dataUser);
        await userRepository.save(users);

        return response.status(201).json(users);

        },
    
}

export default ControllerUserProprietor;