
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { FileSystemDatasource } from "../infrastructure/datasourcers/file-system.datasource";
FileSystemDatasource
const fileSystemLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource(),
);

export class Server{
 static start(){
    console.log('server started...');

   CronService.createJob(
    '*/5 * * * * *',
    ()=>{
       //const url='https://localhost:3000';
       const url='https://google.com';
      new CheckService(
        fileSystemLogRepository,
        //DI
        ()=>console.log(`${url} is ok`),
        (error)=>console.log(error),
      ).execute(url);
    }
   );
 }
}
