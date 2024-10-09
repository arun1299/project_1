/* eslint-disable @typescript-eslint/no-unused-vars */

export interface payroll {
  s_no           :number;
  name         :string;
  from_date    :number;
  to_date      :number;
  status       :number;
}

export interface attendance {
  id     :number;
  emp_id :number;
  name:string;
  hr:number;
  ot:number;
  cl:number;
  sl:number;
  pl:number;
  status:number
}


export interface DetailView {
  emp_id : number;
  row_id : number;
  salary_id: number;
  name   : string;
}


export interface salary_amount {
  id        : number;
  tran_date : number;
  utr       : number;
  amount    : number;
  reference : string;
}
