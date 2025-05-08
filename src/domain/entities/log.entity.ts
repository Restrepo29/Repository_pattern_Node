
//vamos a tener lo que nosotros queremos registrar
// en nuestra aplicacion

export enum LogSeverityLevel{
    low='low',
    medium='medium',
    high='high',
}

export class LogEntity{

    public level: LogSeverityLevel;//enum
    public message:string;
    public createAt:Date;

    constructor(message:string, level:LogSeverityLevel){
        this.message=message;
        this.level=level;
        this.createAt=new Date();
    }

    static fromJson =(json:string):LogEntity=>{ 
        JSON.parse(json);
        const{message,level,createdAt}=JSON.parse(json);

        //validaciones sepueden hacer aqui
        const log=new LogEntity(message,level);
        log.createAt=new Date(createdAt);
       
      return log;
    }
}
