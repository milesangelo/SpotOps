import authService from '../api-authorization/AuthorizeService'

// export const fetchWrapper2 = {
//     //get,
//     //post,
//     put,
//     delete: _delete
// };

class FetchWrapper {
    

    /**
     * 
     */
    async get (url)  {
      
        let fullUrl = url.concat("/get")

        console.log('get ', fullUrl)
        const token = await authService.getAccessToken();
        const requestOptions = this.getRequestOptionsFor('GET', token);
        const response = await fetch(fullUrl, requestOptions)
        const data = await response.json()

        return (data) ? data : []
        
    }

    async getById (url, id) {
        let fullUrl = url.concat("/get").concat("/", id)
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('GET', token);
        let data = await fetch(fullUrl, requestOptions)
            .then(response => response.json())
            .catch(alert)

        return (data) ? data : {}
    }

    async post(url, params) {
        let fullUrl = url.concat("/post")
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('POST', token, params);

        await fetch(fullUrl, requestOptions);
    }

    async delete(url, id) {
        let fullUrl = url.concat("/delete").concat("/", id)
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('DELETE', token, id);

        await fetch(fullUrl, requestOptions)
            .catch(alert);
        
    }

    async put(url, id, params) {
        let fullUrl = url.concat("/update").concat("/", id)
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('PUT', token, params);

        await fetch(fullUrl, requestOptions)
            .catch(alert);
    }

    getRequestOptionsFor(method, token, params = undefined) {
        return this.createRequestOption(method,token,params);
    }

    createRequestOption(method, token, params) {
        console.log('createRequestOption.token; ', token ? true : false)
        console.log('createRequestOption.method; ', method)
        console.log('createRequestOption.params; ', params)

        if (!method) return null;

        if (params) {
            return {
                method: method,
                headers: (!token) ? 
                {} : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            };
        } else {
            return {
                method: method,
                headers: (!token) ? 
                {} : {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
    }

    // getRequestOptionsFor(httpMethod, token) {
    //     return {
    //         method: httpMethod,
    //         headers: (!token) ? 
    //             {} : { 
    //                 'Authorization': `Bearer ${token}`
    //             }
    //     }
    // }



}

const fetchWrapper = new FetchWrapper()

export default fetchWrapper;

// function post(url, body) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }

// function put(url, body) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//     };
//     return fetch(url, requestOptions).then(handleResponse);    
// }

// prefixed with underscored because delete is a reserved word in javascript
// function _delete(url) {
//     const requestOptions = {
//         method: 'DELETE'
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }

// // helper functions

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
        
//         if (!response.ok) {
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }