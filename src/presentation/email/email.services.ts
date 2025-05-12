import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



interface sendMailOptions{
    to:string | string[];
    subject:string;
    htmlBody:string;
     attachements?: Attachement[];
}

interface Attachement{
    filename:string;
    path:string;
}

// todo: Attachement

export class EmailService{

private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth:{
        user: envs.MAILER_EMAIL,
        pass: envs.MAILER_SECRET_KEY,
    }

});

constructor(
    //private readonly logRepository:LogRepository,
){

}
async sendEmail(options:sendMailOptions):Promise<boolean>{

    const { to,subject,htmlBody, attachements=[]}= options
    
    try {

        const sentInformation=await this.transporter.sendMail({
            to:to,
            subject:subject,
            html:htmlBody,
            attachments:attachements,
        });

       // console.log(sentInformation);
       //al intectar si todo sale bien llamo a 
       const log=new LogEntity({
        level:LogSeverityLevel.low,
        message:'Email sent',
        origin: 'email.service.ts'
       })
       //this.logRepository.saveLog(log)
        return true;
        
    } catch (error) {
        const log=new LogEntity({
            level:LogSeverityLevel.high,
            message:'Email not sent',
            origin: 'email.service.ts'
           })
          // this.logRepository.saveLog(log)
        return false
    }
}

async sendEmailWithFileSystemLogs( to:string | string[]){

    const subject = 'Logs del servidor'
    const htmlBody =`
  <h2>probando correo</h2>
  <p> ESto es una prueba de enviar correo con  <strong>NODEMAILER</strong> en Node. </p>
  <img src=https://fazendoanossafesta.com.br/wp-content/uploads/2023/05/Flork-Artes-sem-Fundo-Dia-dos-Namorados-17-768x591.png" width=500px>
  `;

  const attachements:Attachement[]=[
{ filename:'logs-low.log',path:'./logs/logs-low.log'},
{ filename:'logs-high.log',path:'./logs/logs-high.log'},
{ filename:'logs-medium.log',path:'./logs/logs-medium.log'}

  ];
  return this.sendEmail({
    to,subject,attachements,htmlBody
  });
}
}
