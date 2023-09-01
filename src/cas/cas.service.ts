import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { dataDto } from './dto/create-cam.dto';


@Injectable()
export class CasService {
  constructor(private readonly prisma: PrismaService,

  ) { }

  async CAM(json: dataDto) {

    const { folios, investor_info, ...CAM } = json;

    try {
      const cas_id = uuidv4();
      const save = await this.prisma.cAM.create({
        data: {
          cas_id: cas_id,
          cas_type: CAM.cas_type.toString(),
          file_type: CAM.file_type.toString(),
          statement_period: CAM.statement_period,
          ...investor_info,
          folios: {
            createMany: {
              data: folios.map((eachFolio) => ({
                kyc: eachFolio.KYC.toString(),
                pan: eachFolio.PAN.toString(),
                pankyc: eachFolio.PANKYC.toString(),
                amc: eachFolio.amc.toString(),
                folio: eachFolio.folio.toString(),
              })),
              skipDuplicates: true,
            }
          }
        },

      });

      if (save) {
        console.log("CAM Saved Successfully")
      }

      const SaveScheme = folios.map(async (eachFolio) => {
        if (eachFolio.schemes.length > 0) {
          const savescheme = await this.prisma.cAM_Schemes.createMany({
            data: eachFolio.schemes.map((eachScheme) => ({
              folio_id: eachFolio.folio.toString(),
              advisor: eachScheme?.advisor.toString(),
              amfi: eachScheme?.amfi.toString(),
              close: eachScheme?.close.toString(),
              close_calculated: eachScheme?.close_calculated.toString(),
              isin: eachScheme.isin.toString(),
              open: eachScheme?.open.toString(),
              rta: eachScheme?.rta.toString(),
              rta_code: eachScheme?.rta_code.toString(),
              scheme: eachScheme?.scheme.toString(),
              type: eachScheme?.type.toString(),
              valuation: eachScheme.valuation,
            })),
            skipDuplicates: true,
          })
          if (savescheme) {
            console.log("Schemas Saved Saved Successfully")
          }
          const { schemes } = eachFolio;
          const mapScheme = schemes.map(async (eachScheme) => {
            const { transactions } = eachScheme;
            if (transactions.length > 0) {
              const saveTransaction = await this.prisma.cAM_Transactions.createMany({
                data: transactions.map((transaction) => {
                  return {
                    trans_scheme_id: eachScheme.isin.toString(),
                    amount: transaction?.amount?.toString() || null,
                    balance: transaction?.balance?.toString() || null,
                    description: transaction?.description?.toString() || null,
                    dividend_rate: transaction?.dividend_rate?.toString() || null,
                    nav: transaction?.nav?.toString() || null,
                    type: transaction?.type?.toString() || null,
                    units: transaction?.units?.toString() || null,
                  }
                }),
                skipDuplicates: true,
              })

              if (saveTransaction) {
                console.log("saveTransaction Saved Successfully")
              }
            }
          })
        }
      })
    } catch (e) {
      console.log(e)
    }

    return { "msg": "CAM data Save Successfull", "status": 200 };
  }

  async cdslService(json: any) {
    const { AccountInfo, InvestorInfo, MutualFundFolioInfo, CdslInfo, NsdlInfo, StatementPeriod } = json;
    console.log(AccountInfo.GrandTotal.toString())

    try{

      await this.prisma.accountInfo.create({
        data: {
          investorInfoId: "79c9af0a-6ef4-4df1-98d6-248d0357a7c7",
        }
      })
  
      const saveinvestor = await this.prisma.investorInfo.create({
        data: {
          ...InvestorInfo,
          StatementPeriod,
          accountInfo: {
            create: [
              {
                GrandTotal: AccountInfo.GrandTotal.toString() || null,
                TotalAccount: AccountInfo.TotalAccount.toString() || null,
                accounts: {
                  create: AccountInfo.Accounts.map((eachAccount) => ({
                    AccountClass: eachAccount?.AccountClass?.toString() || null,
                    AccountType: eachAccount?.AccountType?.toString() || null,
                    Value: eachAccount?.Value?.toString() || null,
                  }))
                }
              }
  
            ]
          },
          cdslInfo: {
            create: {
              TotalAccount: CdslInfo?.TotalAccount?.toString() || null,
              TotalValue: CdslInfo?.TotalValue?.toString() || null,
              Accounts: {
                create: CdslInfo?.Accounts?.map((eachAccount) => ({
                  Account_Status: eachAccount["Account Status"]?.toString() || null,
                  BO_ID: eachAccount["BO ID"]?.toString() || null,
                  BO_Status: eachAccount["BO Status"]?.toString() || null,
                  BO_Sub_Status: eachAccount["BO Sub Status"]?.toString() || null,
                  BO_Sub_Type: eachAccount["BO Sub Type"]?.toString() || null,
                  BO_Type: eachAccount["BO Type"]?.toString() || null,
                  BSDA: eachAccount["BSDA"]?.toString() || null,
                  DP_Name: eachAccount["DP Name"]?.toString() || null,
                  DPID: eachAccount["DPID"]?.toString() || null,
                  Email_Id: eachAccount["Email Id"]?.toString() || null,
                  Frozen_Status: eachAccount["Frozen Status"]?.toString() || null,
                  Mobile_No: eachAccount["Mobile No"]?.toString() || null,
                  Nominee: eachAccount["Nominee"]?.toString() || null,
                  RGESS: eachAccount["RGESS"]?.toString() || null,
                  TotalEquity: eachAccount?.EquityList?.TotalEquity?.toString() || null,
                  TotalValue: eachAccount?.EquityList?.TotalValue?.toString() || null,
  
                  EquityList: {
                    create: eachAccount?.EquityList?.Equities?.map((eachEquity) => ({
                        CurrentBalance: eachEquity?.CurrentBalance?.toString() || null,
                        Isin: eachEquity?.Isin?.toString() || null,
                        IsinName: eachEquity?.IsinName?.toString() || null,
                        Value: eachEquity?.Value?.toString() || null,
                      }))
                  }
  
                }))
              }
            }
          },
          nsdlInfo: {
            create: {
              TotalAccount: NsdlInfo?.TotalAccount?.toString() || null,
              TotalValue: NsdlInfo?.TotalValue?.toString() || null,
              Accounts: {
                create: NsdlInfo?.Accounts?.map((eachAccount) => ({
                  Account_Status: eachAccount["Account Status"]?.toString() || null,
                  BO_ID: eachAccount["BO ID"]?.toString() || null,
                  BO_Status: eachAccount["BO Status"]?.toString() || null,
                  BO_Sub_Status: eachAccount["BO Sub Status"]?.toString() || null,
                  BO_Sub_Type: eachAccount["BO Sub Type"]?.toString() || null,
                  BO_Type: eachAccount["BO Type"]?.toString() || null,
                  BSDA: eachAccount["BSDA"]?.toString() || null,
                  DP_Name: eachAccount["DP Name"]?.toString() || null,
                  DPID: eachAccount["DPID"]?.toString() || null,
                  Email_Id: eachAccount["Email Id"]?.toString() || null,
                  Frozen_Status: eachAccount["Frozen Status"]?.toString() || null,
                  Mobile_No: eachAccount["Mobile No"]?.toString() || null,
                  Nominee: eachAccount["Nominee"]?.toString() || null,
                  RGESS: eachAccount["RGESS"]?.toString() || null,
                  TotalEquity: eachAccount?.EquityList?.TotalEquity?.toString() || null,
                  TotalValue: eachAccount?.EquityList?.TotalValue?.toString() || null,
                  EquityList: {
                    create: eachAccount?.EquityList?.Equities?.map((eachEquity) => ({
                        CurrentBalance: eachEquity?.CurrentBalance?.toString() || null,
                        Isin: eachEquity?.Isin?.toString() || null,
                        IsinName: eachEquity?.IsinName?.toString() || null,
                        Value: eachEquity?.Value?.toString() || null,
                      }))
                  }
  
                }))
              }
            }
          },
          mutualFundFolioInfo:{
            create:{
              TotalAccount: MutualFundFolioInfo?.TotalAccount?.toString() || null,
              TotalValue: MutualFundFolioInfo?.TotalValue?.toString() || null,
              Accounts:{
                create: MutualFundFolioInfo?.Accounts?.map((eachAccount) => ({
                  AccountClass: eachAccount?.AccountClass?.toString() || null,
                  AccountType: eachAccount?.AccountType?.toString() || null,
                  Value: eachAccount?.Value?.toString() || null,
                  TotalMutualFundFolio: eachAccount?.MutualFundFolioList?.TotalMutualFundFolio?.toString() || null,
                  MutualFundFolioList:{
                    create: eachAccount?.MutualFundFolioList?.MutualFundFolios?.map((eachFolio) => ({
                      ArnCode: eachFolio?.ArnCode?.toString() || null,
                      ClosingBalance: eachFolio?.ClosingBalance?.toString() || null,
                      FolioNumber: eachFolio?.FolioNumber?.toString() || null,
                      InvestmentValue: eachFolio?.InvestmentValue?.toString() || null,
                      Isin: eachFolio?.Isin?.toString() || null,
                      IsinName: eachFolio?.IsinName?.toString() || null,
                      Nav: eachFolio?.Nav?.toString() || null,
                      Value : eachFolio?.Value?.toString() || null,
                    }))
                  }
                }))
              }
            }
          }
        }
      })
  
      if (saveinvestor) {
        console.log("Investor Saved Successfully")
        return {msg:"CDSL data Save Successfull",status:"success"}
      }
    }catch(e){
      console.log(e)
      throw new HttpException("Error in saving CDSL data", 500);
    }
  }
}
