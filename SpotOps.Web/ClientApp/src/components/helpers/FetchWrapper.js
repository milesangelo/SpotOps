import authService from '../api-authorization/AuthorizeService'
import axios from 'axios';

class FetchWrapper {
    
    async get (url)  {
        let fullUrl = url.concat("/get");
        let token = await authService.getAccessToken();
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        const res = await axios.get(fullUrl, config);
        console.log('axios get result ', res)
        return res.data;
    }

    async getById (url, id) {
        let fullUrl = url.concat("/get").concat("/", id)
        console.log('getting token');
        let token = await authService.getAccessToken();

        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
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

    // UPDATE
    async put(url, params) {
        

        let id = params.get('id');
        console.log('id is ', id);
        
        let fullUrl = url.concat("/update").concat("/", id)
        let token = await authService.getAccessToken();
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        }

        console.log('config,', config)

        const res = await axios.put(fullUrl, params, config);
        
        console.log('update returns...', res);
        return res;
        // let requestOptions = this.getRequestOptionsFor('PUT', token, params);

        // await fetch(fullUrl, requestOptions)
        //     .catch(alert);
    }

    // CREATE
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

    // DELETE
    async delete(url, id) {
        let fullUrl = url.concat("/delete").concat("/", id)
        let token = await authService.getAccessToken();
        let requestOptions = this.getRequestOptionsFor('DELETE', token, id);

        await fetch(fullUrl, requestOptions)
            .catch(alert);
        
    }

    async getHeaderWithToken() {
        let token = await authService.getAccessToken();
        return (token) ? {
            headers: {
                'Authorization': `Bearer ${token}`,
            } 
        }: {
            // or throw exception
        }
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