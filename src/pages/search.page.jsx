import {useParams} from 'react-router-dom'
import InPageNavigation from '../components/Home/inpage-navigation.component';
import { useEffect, useState } from 'react';
import LoadMoreData from '../components/Home/LoadMoreData';
import NoDataMessage from '../components/Home/nodata.component';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import BlogPostCard from '../components/Home/blog-post.component';
import axios from 'axios';
import { filterPaginationData } from '../common/filter-pegination-data';
import UserCard from '../components/settings/usercard.component';
import { CiUser } from "react-icons/ci";
const SearchPage = () => {
    const {query} = useParams();
    let [blogs , setBlog] = useState(null);
    let [users , setUsers] = useState(null);

    const searchBlogs = async ({page = 1 , create_new_arr = false }) => {
        const res = await axios.post('http://localhost:3000' + "/search-blogs" , {query , page})
        
        let formatedData = await filterPaginationData({
            state: blogs,
            data: res?.data,
            page,
            counteRoute: "/search-blogs-count",
            data_to_send:{query},
            create_new_arr
          });
      
          // todo ตรวจสอบว่า formatedData ไม่เป็น undefined ก่อนที่จะทำ console.log
          if (formatedData !== undefined) {
            setBlog(formatedData);
          } else {
            console.log("formatedData is undefined");
          }
    }

    const fetchUser = () => {
        axios.post('http://localhost:3000' + '/search-users' , {query})
        .then(({data} ) => {
            if(data !== null){
                setUsers(data);
            }else{
                console.log("formatedData is undefined");
            }
        })
    }
    useEffect(() => {
        resetState();
        searchBlogs({page : 1 , create_new_arr : true});
        fetchUser();
    },[query])

    const resetState = () => {
        setBlog(null);
        setUsers(null);
    }
    const UserCardWrapper = () => {
        if (users === null) {
            return;
        }else{
        return (
            <>
                {
                    users == null ? <Loader /> 
                    :users.length ?
                    users.map((user , i) => (
                        <AnimationWrapper key={i} transition={{duration : 1 , delay : i * 0.08}}>
                            <UserCard user={user}/>
                        </AnimationWrapper>
                    ))
                    : <NoDataMessage message="No User found"/>
                }
            </>
        )
    }}
    return ( 
        <section className='h-cover flex justify-center gap-10'>
            <div className='w-full'>
                <InPageNavigation routes={[`Search Results for "${query}"` , "Account Matched"]} defaultHidden={["Account Matched"]}>
                    <>
                        {blogs == null ? (
                            <Loader />
                          ) : (
                              blogs?.results?.length ? 
                              blogs.results.map((blog, i) => (
                                <AnimationWrapper
                                  key={i}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                >
                                  <BlogPostCard
                                    content={blog}
                                    author={blog?.author.personal_info}
                                  />
                                </AnimationWrapper>
                              ))
                            : <NoDataMessage  message={"No Blogs To Published"} />                   
                        )}
                        <LoadMoreData state={blogs} fetchDataFun={searchBlogs} />
                    </>
                <UserCardWrapper />
                </InPageNavigation>
            </div>
            <div className='min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
                <div className='flex items-center mb-8 gap-1'>
                    <h1 className='font-medium text-xl'>User relate to search</h1>
                    <CiUser className='text-2xl'/>
                </div>
                <UserCardWrapper />
                
            </div>
        </section>
     );
}
 
export default SearchPage;