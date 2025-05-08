
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {

    // los path donde los quiero grabar
  private readonly logPath='logs/';
  private readonly allLogsPath='logs/logs-low.log';
  private readonly mediumLogsPath='logs/logs-medium.log';
  private readonly highLogsPath='logs/logs-high.log';

//en el constructor se va a crear un metodo para asegurar que existan los 
//archivos y poder grabar en ellos
  constructor(){
    //cuando se cree una instancia vamos a mandar a llamar el metodo
    //createLogsFiles
    this.createLogsFiles();
  }

private createLogsFiles=()=>{
if(!fs.existsSync(this.logPath)){
   fs.mkdirSync(this.logPath);
}
[  this.allLogsPath,
    this.mediumLogsPath,
    this.highLogsPath,
].forEach(path=>{
    if(fs.existsSync(path)) return;
    fs.writeFileSync(path, '');
})
}

async  saveLog(newLog: LogEntity): Promise<void> {

  const logAsJson=`${JSON.stringify(newLog)}\n`
       // throw new Error("Method not implemented.");
       fs.appendFileSync(this.allLogsPath, logAsJson)
       //el JSON.stringify transforma el objeto como un json
       //todos los log se van a guardar en allLogsPath
       if(newLog.level===LogSeverityLevel.low) return;

       if(newLog.level===LogSeverityLevel.medium) {
        fs.appendFileSync(this.mediumLogsPath, logAsJson)

       }else{
        fs.appendFileSync(this.highLogsPath, logAsJson)
       }
    }

    private getLogsFromFile=(path:string):LogEntity[]=>{
      const content=fs.readFileSync(path,'utf-8');
      const logs=content.split('\n').map(LogEntity.fromJson);
   // const logs=content.split('\n').map(
    //  log =>LogEntity.fromJson(log)
    //);
      return logs;
    }

  async  getLogs(severityLvel: LogSeverityLevel): Promise<LogEntity[]> {
        
    switch(severityLvel){
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

        case LogSeverityLevel.medium:
          return this.getLogsFromFile(this.mediumLogsPath);

     case  LogSeverityLevel.high:
            return this.getLogsFromFile(this.highLogsPath);

            default:
              throw new Error(`${severityLvel} not implement`);
    }
    }

}