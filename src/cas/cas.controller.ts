import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CasService } from './cas.service';
import { dataDto } from './dto/create-cam.dto';

@Controller('cas')
export class CasController {
  constructor(private readonly casService: CasService) {}

 @Post("CAMS")
  addNew(@Body("data")json:dataDto){
    return this.casService.CAM(json);
  }
  
  @Post("CDSL")
  addcdsl(@Body("data")json:any){
    return this.casService.cdslService(json);
  }


}
