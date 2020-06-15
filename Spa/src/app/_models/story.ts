import {Image} from "./Image";

export interface Story {
  id:number;
  title?:string;
  intro?:string;
  content?:string;
  imageUrl:string;
  datePosted?:Date;
  category?:string;
  author?:string;
  slug?:string;
  views?:number;


}
