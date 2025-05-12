
//vamos a tener lo que nosotros queremos registrar
// en nuestra aplicacion

export enum LogSeverityLevel{
    low='low',
    medium='medium',
    high='high',
}

export interface LogEntityOptions{
    level: LogSeverityLevel;//enum
    message:string;
     origin: string;
     createdAt?:Date;
}

export class LogEntity{

    public level: LogSeverityLevel;//enum
    public message:string;
    public origin: string;
    public createdAt:Date;

    constructor(options:LogEntityOptions){

        const {message,level,origin,createdAt= new Date()} = options;
        this.message=message;
        this.level=level;
        this.createdAt=createdAt;
        this.origin=origin
    }

    static fromJson =(json:string):LogEntity=>{ 
        JSON.parse(json);
        const{message,level,createdAt ,origin}=JSON.parse(json);

        //validaciones sepueden hacer aqui
        const log=new LogEntity({
            message,
            level,
            createdAt,
            origin,
            
    });
       
       
      return log;
    }
}
