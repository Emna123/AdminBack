
export class Product{
      id:number;
      exp_period:number=-1;
      exp_periodTitle:string="Ilimité";
      exp_date:Date;
      productName:string;
      quantity: number;
      price:number;
      type:string;
      qnt_sold:number=0;
      brandid:number;
      brandName:string;
      category:string="Accessoires";
      gender:string="Femme";
      description:string;
      prod_image=[];
      size:any[]=[{"size":"30"}];
      new_prod:any=false;
      best_prod:any=false;
      Bestsell:boolean=false;
      old_price:number;
}
