
export default class Server {
    constructor(baseURL = '/') {
        this.baseURL = baseURL === 'admin' ? '/imperia_admin_panel/' : baseURL;
    }

    get(url, data={}, headers = {}, token){
        headers = {
            'X-CSRF-TOKEN':token,
            "X-Requested-With": "XMLHttpRequest",
        }


        if(data){
            url += '?'
            for(let item in data){
                url += `${item}=${data[item]}&`;
            }
        }

        return makeRequest(this.baseURL+url,{
            headers:headers
        })

    }

    post(url, data, headers = {}, token) {
        if(!(data instanceof FormData) && (data instanceof Object))
            data = objToFormData(data);

        headers = Object.assign({
            'X-CSRF-TOKEN':token,
            "X-Requested-With": "XMLHttpRequest",
        }, headers)

        return makeRequest(this.baseURL+url, {
            method: 'POST',
            body: data,
            headers:headers
        })
    }
    put(url, data, headers = {}, token){

        if(data instanceof Object)
            data = JSON_to_URLEncoded(data)

        headers = Object.assign({
            'X-CSRF-TOKEN':token,
            "X-Requested-With": "XMLHttpRequest",
            'content-type':'application/x-www-form-urlencoded'
        }, headers)


        return makeRequest(this.baseURL+url, {
            method: 'PUT',
            body: data,
            headers:headers
        })
    }

    delete(url, headers = {}, token){

        headers = {
            'X-CSRF-TOKEN':token,
            "X-Requested-With": "XMLHttpRequest",
        }

        return makeRequest(url,{
            method:'DELETE',
            headers:headers
        })
    }
}



function makeRequest(url, options = {}) {

    return fetch(url, options).then(response => {

        //return response.text();
        if (response.status === 200 || response.status === 422) {
            return response.json();
        }
        return response.text();
    });
}


function objToFormData(data){
    let form = new FormData()
    for(let elem in data){
        form.append(elem, data[elem]);
    }
    return form

}

function JSON_to_URLEncoded(element,key,list = []){
    if(typeof(element)=='object'){
        for (let idx in element)
            JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
    } else {
        list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
}








