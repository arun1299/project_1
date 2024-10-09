import { Time } from "@angular/common";

export interface attendance {
  id     :number;
  emp_id :number;
  name:string;
  att_hr:Time;
  att_ot:Time;
  att_cl:Time;
  att_sl:Time;
  att_pl:Time;
  status:number
}
