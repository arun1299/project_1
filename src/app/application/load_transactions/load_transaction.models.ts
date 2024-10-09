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
  purchase   : number;
  sales      : number;
  status     : number;
}


export interface loan_transaction
{
  s_no       : number
  id         : number
  banck_acco : number
  amount     : number
  intrest    : number
  princ_amou : number
  emi        : number
  intrest_percentage : number
  status     : number
}
