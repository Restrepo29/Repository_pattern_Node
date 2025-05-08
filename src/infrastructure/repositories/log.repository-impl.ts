import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements LogRepository{


    constructor(
        private readonly LogDatasource:LogDatasource,//Esta es una inyeccion de dependencia
    ){}

    //control + punto se implemento las interfaces

    saveLog(log: LogEntity): Promise<void> {
  return  this.LogDatasource.saveLog(log);
    }
    getLogs(severityLvel: LogSeverityLevel): Promise<LogEntity[]> {
  return   this.LogDatasource.getLogs(severityLvel)
    }
    
}