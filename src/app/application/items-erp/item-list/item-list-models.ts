export interface ItemCategory {
  id         : number;
  item_name  : string;
  item_cat   : string;
  item_type  : number;
  hsnsac     : number;
  price      : number;
  uom        : number;
  tax_percent: number;
  description: string;
  location   : string;
  purchase   : number;
  sales      : number;
  status     : number;
}

export interface category{
  cat_id :number,
  title  :string
}

export interface tax{
  rate :number,
  name  :string
}
