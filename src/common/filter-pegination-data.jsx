import axios from 'axios';
export const filterPaginationData = async ({create_new_arr = false , state , data , page , counteRoute , data_to_send = {}}) => {
    let obj;
    if(state != null && !create_new_arr ){
        return obj = {...state , results: [...state.results , ...data] , page : page }
    }else {
        await axios.post('http://localhost:3000' + counteRoute , data_to_send)
        .then(({data : {totalDocs}}) => {
            obj = {results : data , page  , totalDocs}
            return obj;
        })
        .catch(err => {
            console.log(err)
        })
       return obj;
    }
}
 