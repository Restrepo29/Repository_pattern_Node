import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


//cualquier clase que implemente la clase abstrata 
//tiene que tener lo que se defina en esta

export abstract class LogDatasource{
    abstract saveLog(log:LogEntity):Promise<void>;
    abstract getLogs(severityLvel:LogSeverityLevel):Promise<LogEntity[]>

}