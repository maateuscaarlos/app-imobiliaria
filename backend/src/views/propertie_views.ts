import Propertie from "../models/Propertie";
import images_views from "./images_views";
import userPropertie_view from "./userPropertie_view";

interface PropertiesView{
    id:number;
    name:string;
    about:string;
    instructions:string;
    latitude:number;
    longitude:number;
    images:ImagesView[];

}
interface ImagesView{
  id:number;
  url:string
}
interface UserPropriertorView{
    id:number;
    name: string;
    telephone: string;
    email:string;
    password:string;
    properties:PropertiesView[];
}

export default{
  render(propertier: Propertie):PropertiesView{
      console.log(propertier.id);
      console.log(propertier.name);
      console.log(propertier.latitude);
      console.log(propertier.longitude);
      console.log(propertier.about);
      console.log(propertier.instructions);
      console.log(images_views.renderMany(propertier.images))
    return{
      id:propertier.id,
      name:propertier.name,
      latitude:propertier.latitude,
      longitude:propertier.longitude,
      about:propertier.about,
      instructions:propertier.instructions,
      images:images_views.renderMany(propertier.images),

    };
  },
  renderMany(propertiers:Propertie[]):PropertiesView[]{
    return propertiers.map(Propertie=>{
        console.log(propertiers)
        return this.render(Propertie)});

  }
}
