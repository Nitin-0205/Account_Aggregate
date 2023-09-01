import { Transform } from "class-transformer"
import { IsObject, IsString } from "class-validator"

export class dataDto{
    @IsString()
    cas_type:String
    @IsString()
    file_type:String
    @IsObject()
    statement_period:object
    @IsObject()
    investor_info:object
    folios:CAM_FoliosDto[]
}
export class CamDto {
  @IsString()
  cas_id       :String 
  @IsString()
  file_type      :  String
  @IsString()
  address        :  String
  @IsString()
  email           : String
  @IsString()
  name            : String
  @IsString()
  mobile          : String
  @IsObject()
  statement_period: object
  folios         :  CAM_FoliosDto[]
}
export class CAM_FoliosDto{
    @IsString()
    folio_id:String
    
    @IsString()    
    @Transform(({ value }) => value.toString())
    cas_id:String
    
    @IsString()
    @Transform(({ value }) => value.toString())
    KYC:String
    
    @IsString()
    @Transform(({ value }) => value.toString())
    PAN:String
    
    @IsString()
    @Transform(({ value }) => value.toString())
    PANKYC:String
    
    @IsString()
    @Transform(({ value }) => value.toString())
    amc:String

    folio:String

    schemes:CAM_SchemesDto[]
}
export class CAM_SchemesDto{
    @IsString()
    advisor:String

    @IsString()
    amfi:String

    @IsString()
    close:String

    @IsString()
    close_calculated:String

    @IsString()
    isin:String

    @IsString()
    open:String

    @IsString()
    rta:String

    @IsString()
    rta_code:String

    @IsString()
    scheme:String

    @IsString()
    folio_id:String

    @IsString()
    type:String


    @IsString()
    valuation:object

    transactions:CAM_TransactionsDto[]

}

export class CAM_TransactionsDto{
    @IsString()
    trans_scheme_id :String

    @IsString()
    amount:String

    @IsString()
    balance:String

    @IsString()
    date:String

    @IsString()
    description:String

    @IsString()
    dividend_rate:String

    @IsString()
    nav:String

    @IsString()
    type:String

    @IsString()
    units:String
}





