import {Server} from '../src/presentation/server'
import { envs } from './config/plugins/envs.plugin';



(async()=>{

main();

})();

function main(){
  Server.start();
 // console.log(envs.PORT)
}

main()