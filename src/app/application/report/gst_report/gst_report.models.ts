/* eslint-disable @typescript-eslint/no-empty-interface */
export interface gst_details{
  s_no             : number
  Date             : number
  Invoice_No       : string
  Bill_No          : string
  Po_No            : string
  cgst             : number
  sgst             : number
  igst             : number
  payment_status   : string
}


export interface material_list{
  s_no              : number
 date               : number
 item_name          : string
 tax_percent        : number
 cgst               : number
 sgst               : number
 igst               : number
  status            : number
}




