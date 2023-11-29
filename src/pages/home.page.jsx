import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/Home/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/Home/blog-post.component";
import MinimalBlogPosts from "../components/Editor/nobanner-blog-post.component";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { ActiveTabRef  } from "../components/Home/inpage-navigation.component";
import NoDataMessage from "../components/Home/nodata.component";
import { filterPaginationData } from "../common/filter-pegination-data";
import LoadMoreData from "../components/Home/LoadMoreData";

const HomePage = () => {
  let [blogs, setBlog] = useState(null);

  let [trendingBlogs, setTrendingBlogs] = useState(null);
  // Todo : setState หน้า home แล้วเมื่อกคลิกที่ category หน้าก็จะเป็น ตามที่คลิก แล้วก็จะทำการ fetch ข้อมูลตาม category
  let [pageState , setPageState] = useState("home")
  // Todo: สร้าง state page ไว้เรียกใช้งาน api เรียกตามจำนวน page
  // let [pageChange , setPageChange] = useState(1);
  //! static category
  let categories = [
    "programming",
    "hollywood",
    "film",
    "social media",
    "cooking",
    "technology",
    "finances",
    "travel",
  ];
  //* fetch ตามจำนวนหน้าที่ส่งเข้ามาใน function
  const fetchLatestBlogs = async ({ page }) => {
    try {
      const res = await axios.post("http://localhost:3000/lastest-blog", { page });
      // console.log(res.data);
  
      let formatedData = await filterPaginationData({
        state: blogs,
        data: res?.data,
        page,
        counteRoute: "/all-lastest-blogs-count",
      });
  
      // ตรวจสอบว่า formatedData ไม่เป็น undefined ก่อนที่จะทำ console.log
      if (formatedData !== undefined) {
        // console.log(formatedData);
        setBlog(formatedData);
      } else {
        console.log("formatedData is undefined");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const fetchTrendingBlogs = async () => {
    const res = await axios.get("http://localhost:3000/trending-blog");
    setTrendingBlogs(res.data)
  };

  const fetchCategory = async ({page}) => {
    const res = await axios.post('http://localhost:3000/search-blogs' , {tag : pageState , page })
    let formatedData = await filterPaginationData({
      state: blogs,
      data: res?.data,
      page,
      counteRoute: "/search-blogs-count",
      data_to_send : {tag : pageState}
    });
    // ตรวจสอบว่า formatedData ไม่เป็น undefined ก่อนที่จะทำ console.log
    if (formatedData !== undefined) {
      // console.log(formatedData);
      setBlog(formatedData);
    } else {
      console.log("formatedData is undefined");
    }
  }

  //todo : จะเรียกใช้งาน api ตาม state ที่หน้าเปลี่ยน
  useEffect(() => {
    //* * เรียกใช้ useRef ที่ import มาจาก inpage-navigation.component.jsx
    ActiveTabRef.current.click();

    if(pageState === "home"){
        fetchLatestBlogs({page : 1});
    }else{
        fetchCategory({page : 1});
    }
    if(!trendingBlogs ){
        fetchTrendingBlogs();
    }
  }, [pageState]);

  // todo : function เปลี่ยน state หน้า
  const loadBlogByCategory = (e) => {
    e.preventDefault();
    let category = e.target.innerText.toLowerCase();
    setBlog(null);
    if(pageState == category){
        setPageState("home")
        return;
    }
    setPageState(category)
  }

  return (
    <AnimationWrapper>
      <section className="h-cover flex gap-10">
        {/* latest */}
        <div className="w-full">
          <InPageNavigation
            routes={[pageState , "trending blog"]}
            defaultHidden={["trending blog"]}
          >
            {/* //todo : หน้า blogs หน้า home.jsx เปลี่ยนตาม state หน้า */}
            <>
              {blogs == null? (
                <Loader />
              ) : (
                  blogs.results.length ? 
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
              {/* //todo : เปลี่ยนหน้า */}
            </>
            {/* //todo : trending blog secction */}
            {trendingBlogs == null ? (
              <Loader />
            ) : (
              trendingBlogs.length ? 
              trendingBlogs.map((blog, i) => (
                <AnimationWrapper
                  key={i}
                  transition={{ duration: 1, delay: i * 0.1 }}>
                  //todo : ส่ง blogs ที่ทำการ loob ไปให้ MinimalBlogPosts ทำการตกแต่ง
                  <MinimalBlogPosts blog={blog} index={i} />
                </AnimationWrapper>
              ))
              : <NoDataMessage  message={"No Trending Blogs"}/>
            )}

          </InPageNavigation>
          <LoadMoreData state={blogs} fetchDataFun={(pageState == "home" ? fetchLatestBlogs : fetchCategory)} />
        </div>


        {/*  filter and trending blogs */}


        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>

              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => (
                  <button onClick={loadBlogByCategory} className={`tag ${pageState == category ? "bg-black text-white" : " "}`} key={i}>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mt-8">
                <h1 className="font-medium text-xl">Trending</h1>
                <HiArrowTrendingUp />
              </div>
              {trendingBlogs == null ? (
                <Loader />
              ) : (
                trendingBlogs.length ? 
                trendingBlogs.map((blog, i) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <MinimalBlogPosts blog={blog} index={i} />
                  </AnimationWrapper>
                )) : <NoDataMessage  message={"No Blogs Published"}/>
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
