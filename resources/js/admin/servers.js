
export default class Server {
    constructor() {
        this.baseURL = '/imperia_admin_panel/'

    }

    get(url, headers = {}){
        return makeRequest(this.baseURL+url,{
            headers:headers
        })

    }

    post(url, data, params = {}, headers = {}) {
        return makeRequest(this.baseURL+url, {
            method: 'POST',
            body: data,
            headers:headers
        })
    }

    delete(url, headers = {}){
        return makeRequest(url,{
            method:'DELETE',
            headers:headers
        })
    }
}



function makeRequest(url, options = {}) {

    return fetch(url, options).then(response => {
        //return response.text();
        if (response.status === 200) {
            return response.json();
        }
        return response;
    });
}



/*
function objToFormData(data){
    let form = new FormData()
    for(let elem in data){
        form.append(elem, data[elem]);
    }
    return form

}
*/






