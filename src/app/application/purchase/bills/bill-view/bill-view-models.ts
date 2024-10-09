

export interface paymentmade_list {
  tran_id:number
  bill_id:number
  vendor_id:number
  customer_name:string
  credit :number
  tran_date:Date
  tran_type:number
  bill_number :string
}

export interface company_account {
  bank_id :number
  account_name:string
  balance :number
}

export interface cash_account {
  bank_id :number
  account_name:string
  balance :number
}

export interface all_account {
  bank_id :number
  account_name:string
  balance :number
}


export interface user_account {
  bank_id :number
  account_name:string
  balance :number
}


export interface gst_account {
  bank_id :number
  account_name:string
  balance :number
}

export interface customer {
  customer_id:number;
  company_name :string
}

