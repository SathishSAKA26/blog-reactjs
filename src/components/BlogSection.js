import React from 'react';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div className="">
      <div className="text-2xl font-bold text-start py-3">Daily Blogs</div>
      <hr className="text-gray-600 pb-2" />
      {blogs?.map((item) => (
        <div className="flex items-center" key={item.id}>
          <div className="image-container">
            <div className="w-full">
              <div className="rounded-lg h-[200px] overflow-hidden bg-cover bg-no-repeat">
                <img src={item.imgUrl} alt={item.title} className="min-w-full h-[240px] cursor-pointer max-w-xs transition duration-300 ease-in-out hover:scale-110" />
                <div className=""></div>
              </div>
            </div>
          </div>
          <article className="text-start w-[70%] ml-5 pt-6">
            <div className="title-container">
              <h6 className="w-[18%] text-center rounded-sm my-2 bg-red-600 font-bold ">{item.category}</h6>
              <span className="font-semibold text-green-300 mb-2">{item.title}</span>
              <span className="flex items-center">
                <div className="text-xl font-medium text-blue-400 my-2 mb-4">{item.author}</div>
                <div className="pl-1 font-normal pb-1 text-blue-200">
                  - {item.timestamp.toDate().toDateString()}
                </div>
              </span>
            </div>
            <div className="mb-1 text-start text-gray-300">
              {excerpt(item.description, 120)}
            </div>
            <Link to={`detail/${item.id}`}>
              <button className="text-gray-400">Read More.</button>
            </Link>
            {user?.uid && item.userId === user.uid && (
              <div className="flex items-center pr-8" style={{ float: "right" }}>
                <BsFillTrashFill
                  className='text-red-700'
                  name='trash'
                  style={{ margin: "15px", cursor: "pointer" }}
                  size="25px"
                  onClick={() => handleDelete(item.id)}
                />
                <Link to={`/update/${item.id}`}>
                  <MdOutlineModeEdit
                    className='text-green-700'
                    name='edit'
                    style={{ cursor: "pointer" }}
                    size="25px"
                  />
                </Link>
              </div>
            )}
          </article>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;