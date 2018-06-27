import {buildApiRequest as A} from '../init'

export default {
    notes: (p,c)=>{A(p,'xxx.php','get',c)},
    noteEedit: (p,c)=>{A(p,'xxx.php','post',c)},
}
