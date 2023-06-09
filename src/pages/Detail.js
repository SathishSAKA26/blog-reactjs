import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

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
        <div className="flex px-14 pt-16">
          <div className="w-1/2">
            <span className="text-start flex items-center">
              By<p className="text-gray-300 text-base font-semibold m-3">{blog?.author}</p>- &nbsp;
              {blog?.timestamp.toDate().toDateString()}
            </span>
            <hr />
            <p className="text-start pt-3 text-slate-300">{blog?.description}</p>
          </div>
          <div className="w-1/2">
            <h2>Tags</h2>
            <h2>Most Popular</h2>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Detail;