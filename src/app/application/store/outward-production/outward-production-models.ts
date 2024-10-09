export  interface outward_stock {
  s_no      : number;
  date_time : number;
  item_name : string;
  qty       : number;
  notes     : string;
}

export  interface outward_project {
  s_no         : number;
  date_time    : number;
  name : string;
  category     : number;
  status       : number;
}
