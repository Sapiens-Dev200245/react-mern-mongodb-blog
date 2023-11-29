import { CiHeart } from "react-icons/ci";
import {Link } from 'react-router-dom'
const BlogPostCard = ({content,author}) => {

    let { publishedAt , tags , title , des , banner , activity:{total_likes} , blog_id:id } = content;
    let {fullname , profile_img,username} = author;
    return ( 
        <Link to={`/blog/${id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
            <div className="w-full ">
                <div className="flex gap-2 items-center mb-7">
                    <img src={profile_img}  className="w-6 h-6 rounded-full"/>
                    <p className="line-camp-1">{fullname} @{username}</p> 
                    <p className="min-w-fit">{new Date(publishedAt).toDateString()}</p>
                </div>
                <h1 className="blog-title">
                    {title}
                </h1>
                <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-camp-2">
                    {des}
                </p>
                <div className="flex gap-4 mt-7">
                    <span className="btn-light py-1 px-4">
                        {tags[0]}
                    </span>
                    <span className="flex items-center ml-3 gap-2 text-dark-grey">
                        <CiHeart className="text-xl" />
                        {total_likes}
                    </span>
                </div>
            </div>

            <div className="h-28 aspect-sqaure bg-grey">
                <img src={banner} className="w-full h-full aspect-square object-cover" />
            </div>
        </Link>

     );
}
 
export default BlogPostCard;