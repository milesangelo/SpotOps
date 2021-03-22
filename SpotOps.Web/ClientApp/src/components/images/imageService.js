import authService from "../api-authorization/AuthorizeService";

class ImageService {
    uploadImage = async (id, photo) => {

        let data = new FormData();

        data.append('formFile', photo)
        data.append('fileName', photo.name)
        data.append('spotId', id);

        console.log('sending image to backend ', photo)
        console.log('formdata ', data.get('formFile'))
        console.log('formdata ', data.get('fileName'))
        console.log('formdata ', data.get('spotId'))

        let token =  await authService.getAccessToken();

        return fetch(`api/images`, { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data })
                .then(res => console.log('Result from image post: ', res))
    }
}

const imageService = new ImageService();

export default imageService;