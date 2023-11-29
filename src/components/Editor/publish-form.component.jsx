import AnimationWrapper from "../../common/page-animation";
import { IoClose } from "react-icons/io5";

import {toast } from 'react-hot-toast'
import { useContext } from "react";
import { EditorContext } from "../../pages/editor.pages";
import axios from 'axios';
import Tag from "./tags.component";
import { UserContext } from "../../App";
import {useNavigate} from 'react-router-dom';


const PublishForm = () => {
    let navigate = useNavigate();
    let charactorLimit = 200;
    let tagLimit = 10;
    let { setEditorState , blog , setBlog} = useContext(EditorContext);
    let { userAuth} = useContext(UserContext);
    const handleClostEvent = () => {
        setEditorState("editor");
    }

    const handleTitleChange = (ev) => {
        let input = ev.target;
        setBlog({...blog , title : input.value})
    }

    const handleBlogDescChange = (ev) => {
        let input = ev.target;
        setBlog({...blog , des : input.value})
    }
    const handleTitleKeyDown = (e) => {
        console.log(e)
        if(e.keyCode === 13){
            e.preventDefault();
        }
    }

    const handleKeyDown = (ev) => {
        if (ev.keyCode === 13 || ev.keyCode === 188) {
            ev.preventDefault();
    
            let tag = ev.target.value.trim(); // ให้ลบช่องว่างที่อาจจะมีได้ด้วย
            let tags = blog?.tags;
            
            if (tags.length < tagLimit) {
                if (!tags.includes(tag) && tag.length) {
                    setBlog((prevBlog) => ({
                        ...prevBlog,
                        tags: [...prevBlog?.tags, tag],
                    }));
                }else{
                    toast.error("Tags has already exits")
                }
            } else {
                toast.error(`You can add max ${tagLimit} Tags`);
            }
    
            ev.target.value = '';
        }
    };
    const publishBlog = async (ev) => {
        ev.preventDefault();
        if(ev.target.className.includes("disable")){
            return 
        }
        if(!blog?.title.length){
            toast.error('Write blog little before publishing');
        }
        if(!blog?.des.length || blog?.des.length > charactorLimit){
            toast.error(`Write a description about your blog withing ${charactorLimit} charactors to publish`);
        }
        if(!blog?.tags.length){
            return toast.error('Enter at least 1 tag to help us rank you blog')
        }
        let loadingToast = toast.loading("Publishing....")
        ev.target.classList.add('disable');

        let blogObj = {
            title : blog?.title,
            banner : blog?.banner,
            des : blog?.des,
            content:blog?.content,
            tags : blog?.tags,
            draft:false
        }
        try {
            const res = await axios.post('http://localhost:3000' + '/create-blog',blogObj , {
                headers:{
                    'Authorization' : `Bearer ${userAuth?.access_token}`
                }
            })
            ev.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            toast.success("Publish 👍");
            console.log(res)
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            ev.target.classList.remove('disable');
            toast.dismiss(loadingToast);
            toast.success("Fail to publish");
            console.log(error);
        }
    }

    return (
        <AnimationWrapper>
            <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16">
                <button 
                className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                onClick={handleClostEvent}
                >
                    <IoClose className="text-5xl" />
                </button>

                <div className="max-w-[550px] center">
                    <p className="text-dark-grey mb-1">
                        Preveiw
                    </p>
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
                        <img src={blog?.banner} className="bg-red" />
                    </div>
                    <h1 className="text-4xl font-mudium mt-2 leading-tight line-clamp-2">{blog?.title}</h1>
                    <p className="font-gelasio line-camp-2 text-xl leading-7 mt-4 ">{blog?.des}</p>
                </div>
                {/* content */}
                <div className="border-grey lg:border-1 lg:pl-8">
                    <p className="text-dark-grey mb-2 mt-9">Blog Title : </p>
                    <input 
                    type="text" 
                    placeholder="Blog Title" 
                    defaultValue={blog?.title} 
                    className="input-box pl-4 "
                    onChange={handleTitleChange}
                    />

                    <p className="text-dark-grey mb-2 mt-9">Short description about your blog : </p>
                    <textarea
                        maxLength={charactorLimit}
                        defaultValue={blog?.des}
                        className="h-40 resize-none leading-7 input-box pl-4"
                        onChange={handleBlogDescChange}
                        onKeyDown={handleTitleKeyDown}
                    >
                    </textarea>
                    <p className="mt-1 text-dark-grey text-sm text-right">{charactorLimit - blog?.des.length} 
                        charactors Left
                    </p>
                    <p className="text-dark-grey text-sm text-right">
                        Topics - ( Helps is searching and ranking your blog post )
                    </p>

                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input 
                        type="text" 
                        placeholder="Topic" 
                        className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white" 
                        onKeyDown={handleKeyDown}
                        />
                        {
                            blog?.tags.map((tag,i) => {
                                return <Tag tag={tag} tagIndex={i} key={i}/>
                            })
                        }
                    </div>
                    <p className="mt-1 mb-4 text-dark-grey text-right">
                            { tagLimit - blog?.tags.length } Tags Left
                    </p>

                    <button 
                    className="btn-dark px-8"
                    onClick={publishBlog}
                    >
                        Publish
                    </button>
                </div>
                
            </section>
        </AnimationWrapper>
    )
}
export default PublishForm;