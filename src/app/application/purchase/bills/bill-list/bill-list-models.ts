export interface bill_detail {
  id:number;
  bill_date:number;
  bill_number:number;
  po_number:number;
  vendor_name:string;
  reference_number:number;
  description:string;
  bill_due_date:number;
  total:number;
  balance :number,
  paid_amount :number
}
