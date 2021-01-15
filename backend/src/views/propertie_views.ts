import Images from "../models/Images";
import Propertie from "../models/Propertie";
import images_views from "./images_views";

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
export default{
  render(propertier: Propertie):PropertiesView{
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
    return  propertiers.map(Propertie=> this.render(Propertie));
  }
}
