/* eslint-disable @typescript-eslint/no-explicit-any */
export interface report_list{
  report_group : any
  starred    : any
  title      : string
  id         : number
  icon       : string
  name       : string
}


export interface report_group{
  report_group : number
  title : string
  id    : number
  icon  : string
  name  : string
}


export interface sales_report{
  s_no          :number
  Customer_Name :string
  Invoice_Count :number
  Without_Tax   :number
  Tax           :number
  Sales         :number
}


export interface invoice_details{
  s_no             : number
  Date             : number
  Invoice_No       : string
  Due_date         : number
  Reference_number : string
  Customer_name    : string
  Status           : string
  Total            : number
  Balance          : number
  Paid_Amount      : number
  Tax_amount       : number
  Amount_without_tax:number
  price_precision  : number
}

export interface delevery_challen
{
  s_no             : number
  Date             : number
  DC_Number        : string
  Customer_Name    : string
  Amount           : number
}


export interface inventory_models
{
  s_no             : number
  Item_Name        : string
  Batch_Number     : string
  Quantity_Ordered : number
  Quantity_In      : number
  Quantity_Out     : number
  Stock_on_Hand    : number
}

export interface stock_models
{
  s_no             : number
  Item_Name        : string
  Batch_Number     : string
  Quantity_in      : number
  Quantity_Out     : number
  Balance          : number
}


export interface customer_balances
{
  s_no             : number
  Customer_Name    : string
  Sales            : number
  Received         : number
  Balance          : number
}


export interface payment_received
{
  s_no             : number
  Invoive_No       : string,
  Reference_Number : string,
  Customer_Name    : string,
  Date             : number,
  Amount           : number,
  Payment_Mode     : string,
  Deposited_To     : string
}
