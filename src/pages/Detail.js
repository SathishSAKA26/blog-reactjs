import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };

    getBlogData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogsDetail = await getDoc(docRef);
    setBlog(blogsDetail.data());
    setActive(null);
  }

  return (
    <div className="pt-14 text-center text-white w-full h-[700px]">
      <div className="bg-no-repeat bg-cover h-[600px]" style={{ backgroundImage: `url("${blog?.imgUrl}")` }}>
        <div className="font-bold pt-[600px]">
          <span className="">{blog?.timestamp.toDate().toDateString()}</span>
          <h2 className="text-6xl pt-2 underline">{blog?.title}</h2>
        </div>
      </div>
      <div className="pt-16">
        <div className="w-full flex px-14 pt-16 justify-between">
          <div className="w-[60%]">
            <span className="text-start flex items-center">
              By<p className="text-gray-300 text-base font-semibold m-3">{blog?.author}</p>- &nbsp;
              {blog?.timestamp.toDate().toDateString()}
            </span>
            <hr />
            <p className="text-start pt-3 text-slate-300">{blog?.description}</p>
          </div>
          <div className="w-[30%]">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Detail;