import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute( url:string):Promise<boolean>;
}

type  SuccessCallback=()=>void;
type ErrorCallback =(error:string)=>void;


export class CheckService implements CheckServiceUseCase {

    constructor(

        //DI
        private readonly logRepository:LogRepository,
        //readonly para que nadie lo cambie accidentalmente
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){}

   public  async execute(url:string):Promise<boolean>{

        try{
            const req=await fetch( url);
            if (!req.ok){
                throw new Error(`Error on check service ${ url }`);
            }

            const log= new LogEntity({
           message:`Service ${url} working`,
            level: LogSeverityLevel.low,
            origin:'check-service.ts'
            });
            this.logRepository.saveLog( log)
            this.successCallback();
           
            return true;
        } catch(error){
            const errorMessage=`${url} is not ok.${error}`;
            const log= new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin:'check-service.ts'
        });
            this.logRepository.saveLog(log);
            this.errorCallback(errorMessage);
        return false;
        }
    }
}