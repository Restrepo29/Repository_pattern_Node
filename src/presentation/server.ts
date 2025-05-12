
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { FileSystemDatasource } from "../infrastructure/datasourcers/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.services";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
FileSystemDatasource
const fileSystemLogRepository=new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const emailService= new EmailService(
  
);

export class Server{
 static start(){
    console.log('server started...');
console.log(envs.MAILER_EMAIL,envs.MAILER_SECRET_KEY)

// todo: Mandar EMAIL
new SendEmailLogs(
  emailService,
  fileSystemLogRepository,
).execute(['vanneynicol@hotmail.com','voortiz29@gmail.com'])


//emailService.sendEmailWithFileSystemLogs(
  //['vanneynicol@hotmail.com','voortiz29@gmail.com']
//)


 //  CronService.createJob(
 //   '*/5 * * * * *',
  //  ()=>{
       //const url='https://localhost:3000';
   //   const url='https://google.com';
   //   new CheckService(
    //    fileSystemLogRepository,
        //DI
   //    ()=>console.log(`${url} is ok`),
   //     (error)=>console.log(error),
   //   ).execute(url);
  //  }   
 //  );  
 }
}
