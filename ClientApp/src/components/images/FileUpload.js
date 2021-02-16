import React, {useState } from 'react'
import { useEffect } from 'react/cjs/react.development';
import authService from '../api-authorization/AuthorizeService'

const FileUpload = () => {

    console.log('FileUpload');

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [fileURL, setFileURL] = useState();
    const [geo, setGeo] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0])
        setFileURL(URL.createObjectURL(e.target.files[0]))
        setFileName(e.target.files[0].name);
    }

    const uploadFile = async(e) => {
        console.log(file);
        const formData = new FormData();

        console.log('geo ', geo)
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        
        console.log('whats this result? ', ((geo && geo.lat) || 0));

        formData.append("latitude", (geo && geo.lat) || 0);
        formData.append("longitude", (geo && geo.lng) || 0);

        let url = 'api/images'
        
        try {
            let token = await authService.getAccessToken();

            await fetch(url, {
                method: 'post',
                headers: (!token) ? 
                {} : {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            })
            .then(res => {
                console.log('fetch fileupload : ', res)
            });
        } catch (error) {
            console.error(error);   
        }
    }


    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("geo enabled")
            console.log(
                navigator.geolocation.getCurrentPosition((pos) => {
                    console.log('geo data: success: ', pos)
                }))
            navigator.geolocation.getCurrentPosition((pos) => {
                setGeo({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
            })
        } else {
            console.log("not available geo")
        }
    }, [])

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("geo enabled")
            console.log(
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log('geo data: success: ', pos)
            }))
            navigator.geolocation.getCurrentPosition((pos) => {
                setGeo({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
            })
        } else {
            console.log("not available geo")
        }
    }, [file, fileName])

    return (
        <>
        <p>Lat: {geo && geo.lat}</p>
        <p>Long: {geo && geo.lng}</p>

        <div className="input-group mb-3">
            <div className="text-center">
                <img src={fileURL || ''} className="rounded img-thumbnail" alt="testtttt" />
            </div>
            <input type="file" className="form-control" placeholder="Recipient's username" onChange={saveFile} aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" value="upload" onClick={uploadFile}>Button</button>
            </div>
        </div>
        </>
    )

}


export default FileUpload;