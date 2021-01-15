import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import  * as Yup from 'yup';
import Propertie from '../models/Propertie'
import propetier_view from '../views/propertie_views';
const ControllerPropertie = {

    async index(request:Request, response:Response):Promise<Propertie|any>{
        const propertieRepository = getRepository(Propertie);
        const propertie = await propertieRepository.find({
          relations:['images'],
        });
        return response.status(200).json(propetier_view.renderMany(propertie));
    },
    async show(request:Request, response:Response):Promise<Propertie|any>{
        const {id} = request.params;
        const propertieRepository = getRepository(Propertie);
        const propertie = await propertieRepository.findOneOrFail(id,{
          relations:['images'],
        });
        return response.status(200).json(propetier_view.render(propertie));
      },
      async create(request:Request, response:Response):Promise<Propertie | any>{

        const {name, latitude,longitude,about,instructions} = request.body;
        const userPropriertor_id = 1;
        console.log(name, latitude,longitude,about,instructions,userPropriertor_id);

        const propertieRepository = getRepository(Propertie);

        const reqImages = request.files as Express.Multer.File[];
        const images = reqImages.map(img => {
          return{path:img.filename};
        });
        
        const dataPropertie = {
          name,
          latitude,
          longitude,
          about,
          instructions,
          images,
          userPropriertor_id
        };
        const schema = Yup.object().shape({
          name:Yup.string().required(),
          latitude:Yup.number().required(),
          longitude:Yup.number().required(),
          about:Yup.string().required().max(300),
          instructions:Yup.string().required(),
          userPropriertor_id:Yup.number().required(),
          images:Yup.array(
            Yup.object().shape({
              path:Yup.string().required(),
          }),
          ),
        });
        

        await schema.validate(dataPropertie, {
          abortEarly:false,
        });

        const properties = propertieRepository.create(dataPropertie);
        console.log(properties);
        await propertieRepository.save(properties);

        
        return response.status(201).json(properties);

},
}

export default ControllerPropertie;