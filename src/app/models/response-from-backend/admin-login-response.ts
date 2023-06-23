export interface AdminLoginResponseFromBackEnd{
  status : boolean;
  isAdmin : boolean;
  result : string;
  adminUsername : string;
  adminRefreshedToken : string;
}