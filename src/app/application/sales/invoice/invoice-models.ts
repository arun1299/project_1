export interface invoice_detail {
  id:number;
  invoice_date:number;
  invoice_number:number;
  customer_name:string;
  reference_number:number;
  description:string;
  invoice_due_date:number;
  total:number;
  balance:number;
  paid_amount:number
}
