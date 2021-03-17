import authService from '../api-authorization/AuthorizeService'
import axios from 'axios';

class FetchWrapper {
    
    async get (url)  {
        let fullUrl = url.concat("/get")
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('GET', token);
        return await fetch(fullUrl, requestOptions)
            .then(response => {
                if (response.status === 401) {
                    // We need to redirect to log in again
                    authService.signIn()
                }
                if (response.ok) {
                    let data = response.json()
                    return data ? data : []
                }  
            })
            .catch(err => {
                throw new Error(err);
            }); 
    }

    async getById (url, id) {
        let fullUrl = url.concat("/get").concat("/", id)
        console.log('getting token');
        let token = await authService.getAccessToken();

        console.log('got token');
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                //'content-type': 'multipart/form-data'
            }
        }

        console.log('getting axios ', fullUrl);
        
        const res = await axios.get(fullUrl, config);

        console.log('axios.get() result: ', res.data);
        
        return res.data;
        // let requestOptions = this.getRequestOptionsFor('GET', token);
        // let data = await fetch(fullUrl, requestOptions)
        //     .then(response => response.json())
        //     .catch(alert)

        // return (data) ? data : {}
    }

    async post(url, params) {
        let fullUrl = url.concat("/post");
        let token = await authService.getAccessToken();
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        };

        const res = await axios.post(fullUrl, params, config);
        return res;
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
}

const fetchWrapper = new FetchWrapper()

export default fetchWrapper;