import {Link} from "react-router-dom";
import logo from '../../imgs/logo.png';
import defaultBanner from "../../imgs/blog banner.png";
import AnimationWrapper from "../../common/page-animation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { EditorContext } from "../../pages/editor.pages";
import axios from "axios";
import {toast} from 'react-hot-toast'
import EditorJS from '@editorjs/editorjs'
import { tools } from "./tools.component";
import {useNavigate} from 'react-router-dom'
const BlogEditor = () => {
    let navigate = useNavigate()
    const [img, setImg] = useState(null); // สร้าง state เพื่อเก็บรูปภาพ
    const [imgReview, setImgReview] = useState(null); // สร้าง state เพื่อเก็บ URL ของรูปภาพที่ต้องการแสดงตัวอย่าง
    let {blog,setBlog,textEditor , setTextEditor , setEditorState} = useContext(EditorContext);
    let {userAuth} = useContext(UserContext);

    //!  set editorjs ที่ id ของ div Editorjs //set tools สำหรับ editorjs ที่อยู่ tools.jsx
    useEffect(() => {
        if(!textEditor.isReady){
            setTextEditor(new EditorJS({
                holderId:"textEditor",
                data:blog?.content,
                tools:tools,
                placeholder:"Let's write an awesome story..."
            }))
        }

    },[])

    const handleBannerUpload = async (e) => {
      const uploadedImage = e.target.files[0];
      let loadingToaster = toast.loading("Uploading...");
      setImg(uploadedImage);
      setImgReview(URL.createObjectURL(uploadedImage));
      
      try {
        //todo : !ต้องใช้ formData ในการส่งเข้าไปใน cloudinaty เป็นมาฐาน โดยส่ง file upload_preset cloudname เพื่อระบุเส้นทางเข้าไปใน cloudinary
        const formData = new FormData();
        formData.append('file', uploadedImage);
        formData.append('upload_preset', 's5jgg5lb');
        formData.append('cloud_name', 'duxi1mfhl');

        //*api from cloudinary
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/duxi1mfhl/image/upload',
          formData
        );
  
        const imageUrl = res.data.url;
  
        setBlog({...blog , banner:imageUrl})
        console.log('Uploaded Image URL:', imageUrl);
        toast.dismiss(loadingToaster);
        toast.success('Upload Banner Success 👍');
      } catch (error) {
        toast.dismiss(loadingToaster);
        console.error('Error uploading image:', error);
        toast.error('Failed to upload banner');
      }
    };

    //*สำหรับใช้ button ในการ upload
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            //todo : สร้าง FormData เพื่อส่งไปให้ cloundinaty set file , set upload , set clound name 
            const data = new FormData();
            data.append('file', img);
            data.append('upload_preset', 's5jgg5lb');
            data.append('cloud_name' , 'duxi1mfhl')
            const res = await axios.post('https://api.cloudinary.com/v1_1/duxi1mfhl/image/upload',data)
            toast.success("Upload Banner Success");
        } catch (error) {
            console.log(error)
        }
    }

    const handleTitleKeyDown = (e) => {
        console.log(e)
        if(e.keyCode === 13){
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        let input = e.target;
        //todo : ปรับขนาดความสูงของ textarea ตามข้อความที่ผู้ใช้ป้อน
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
        //todo : copy blog from context แล้วเปลี่ยน title เป็นไปตามที่พิมพ์ลงไปใน textarea
        setBlog({ ...blog , title:input.value });
    };

    const handlePublishEvent = () => {
        if(!blog?.banner.length){
            return toast.error("Upload a blog benner to publish");
        }
        if(!blog?.title.length){
            return toast.error("Write title to publish");
        }

        if(textEditor.isReady){
            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({...blog,content : data});
                    setEditorState("publish");
                }else {
                    return toast.error("Write something in your blog to publish 👌")
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const handleSaveDraft = async(ev) => {
        ev.preventDefault();
        ev.preventDefault();
        if(ev.target.className.includes("disable")){
            return 
        }
        if(!blog?.title.length){
            return toast.error('Write blog tittle before save draft');
        }

        let loadingToast = toast.loading("Saving Draft....")
        ev.target.classList.add('disable');

        if(textEditor.isReady){
            textEditor.save()
                let blogObj = {
                    title : blog?.title,
                    banner : blog?.banner,
                    des : blog?.des,
                    content:blog?.content,
                    tags : blog?.tags,
                    draft:true
                }
                try {
                    const res = await axios.post('http://localhost:3000' + '/create-blog',blogObj , {
                        headers:{
                            'Authorization' : `Bearer ${userAuth?.access_token}`
                        }
                    })
                    ev.target.classList.remove('disable');
                    toast.dismiss(loadingToast);
                    toast.success("Saved 👍");
                    console.log(res)
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                } catch (error) {
                    ev.target.classList.remove('disable');
                    toast.dismiss(loadingToast);
                    toast.error("Fail to publish");
                    console.log(error);
                }
            }
        }
    

    return (
        <>
            <nav className="navbar">
                <Link to='/' className="flex-none w-10">
                    <img src={logo} />
                </Link>


                <p className="max-md:hidden text-blace line-clamp-1 w-full ">
                    {blog?.title.length ? blog?.title : "New Blog"}
                </p>

                <div className="flex gap-4 ml-auto ">
                    <button 
                    className="btn-dark py-2"
                    onClick={handlePublishEvent}
                    >
                        Publish
                    </button>
                    <button 
                    className="btn-light py-2"
                    onClick={handleSaveDraft}
                    >
                        Save Draft
                    </button>
                </div>
            </nav>

            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-70 border-4 border-grey">
                            <label htmlFor="uploadBanner">
                                <img src={!blog?.banner ? defaultBanner : blog?.banner} className="z-20" /> 
                                <input 
                                id="uploadBanner" 
                                type="file" 
                                hidden 
                                onChange={handleBannerUpload}
                                /> 
                            </label>
                        </div>
                        {/* text area */}
                        <textarea 
                        defaultValue={blog?.title}
                        placeholder="Blog Title"
                        className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                        >
                        </textarea>

                        <hr className="w-full opacity-10 my-5"/>

                        <div id="textEditor" className="font-gelasio">

                        </div>

                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}
export default BlogEditor;