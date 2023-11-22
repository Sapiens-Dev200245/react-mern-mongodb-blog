//import tools
import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import axios from 'axios';
import toast from 'react-hot-toast'

// "@editorjs/code": "^2.8.0",
//     "@editorjs/editorjs": "^2.27.2",
//     "@editorjs/embed": "^2.5.3",
//     "@editorjs/header": "^2.7.0",
//     "@editorjs/image": "^2.8.1",
//     "@editorjs/inline-code": "^1.4.0",
//     "@editorjs/link": "^2.5.0",
//     "@editorjs/list": "^1.8.0",
//     "@editorjs/marker": "^1.3.0",
//     "@editorjs/quote": "^2.5.0",

const uploadImageByFile = async (e) => {
    const uploadedImage = e
    try {
        let loadingToaster = toast.loading("Uploading...");
        //*!ต้องใช้ formData ในการส่งเข้าไปใน cloudinaty เป็นมาฐาน โดยส่ง file upload_preset cloudname เพื่อระบุเส้นทางเข้าไปใน cloudinary
        const formData = new FormData();
        formData.append('file', uploadedImage);
        formData.append('upload_preset', 's5jgg5lb');
        formData.append('cloud_name', 'duxi1mfhl');

        //*api from cloudinary
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/duxi1mfhl/image/upload',
          formData
        );

        toast.dismiss(loadingToaster);
        if(res.status === 200){
            toast.success('Upload Banner Success 👍');
        }
        //* ถ้าจะเพิ่มรูปภาพโดยใช้ไฟล์ ต้องระบุ {url : } ก่อนไม่งั้นมันจะ error
        return {
            success: 1,
            file: { url: res.data.url }
        };
  
        // จากการตอบกลับของ Cloudinary คุณสามารถเข้าถึง URL ที่อัปโหลดได้
        const imageUrl = res.data.url;
        if(imageUrl){
            return {
                success : 1,
                file : { url : imageUrl }
            }
        }
        console.log('Uploaded Image URL:', imageUrl);
      } catch (error) {
        toast.dismiss(loadingToaster);
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
}

const uploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e);
        } catch (error) {
            reject(error);
        }
    });

    return link.then(url => {
        return {
            success : 1,
            file : { url }
        }
    })
};

export const tools = {
    embed : Embed,
    list : {
        class:List,
        inlineToolbar : true
    },
    image : {
        class:Image,
        config: {
            uploader:{
                uploadByUrl:uploadImageByUrl,
                uploadByFile: uploadImageByFile
            }
        }
    },
    header : {
        class:Header,
        config: {
            placeholder: "Type Heading...",
            levels : [2,3],
            defaultLevel:2
        }
    },
    quote : {
        class:Quote,
        inlineToolbar : true
    },
    marker : Marker,
    inlineCode : InlineCode,
}