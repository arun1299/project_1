export interface Employee_List {

  id    :number;
  name  :string;
  doj   :number;
  designation :string;
  salary :number;
  status : number ;
  portal_access : number;
}


export interface user_type_list
{
  id   :number;
  name :string;
}

export interface salary_list
{
  id          :number;
  salary_paid :number;
  from_date   :number;
  to_date     :number;
  status      :number;
}
