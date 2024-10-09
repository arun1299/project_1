export interface bill_details{
  s_no             : number
  Status           : string
  Bill_Date        : number
  Bill             : string
  Customer_Name    : string
  Due_Date         : number
  Vendor_Name      : number
  Bill_Amount      : number
  Balance_Amount   : number
}


export interface bill_transaction{
  s_no             : number
  tran_date        : number
  reference        : string
  tran_mode        : number
  credit           : number
  balance          : number
  tran_details     : string
  notes            : number
}




