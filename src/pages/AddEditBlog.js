import React, { useState } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
}

const categoryOptions = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
]

const AddEditBlog = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);

  const { title, tags, trending, category, description } = form;

  const handleChange = (e) => { };

  const handleTags = () => { };

  const handleTrending = () => { };

  const onCategoryChange = () => { };
  return (
    <div className='pt-16 text-center text-white'>
      <div className="">
        <div className="title">
          <div className="text-2xl font-extrabold">
            Create Blogs
          </div>
        </div>
        <div className="create">
          <section className="input-container">
            <form className="input">
              {/* title */}
              <div className="py-3">
                <input type="text" className="w-[50%] h-9 rounded-sm pl-3 text-lg font-semibold" name="title" value={title} onChange={handleChange} placeholder='Title...' />
              </div>
              {/* tags */}
              <div className="w-full">
                <div className="w-[50%] py-3 mx-auto text-lg font-semibold">
                  <ReactTagInput tags={tags} placeholder='Tags...' onChange={handleTags} />
                </div>
              </div>
              {/* radio button */}
              <div className="py-3 flex items-center justify-center justify-around px-28 mx-10">
                <p className="text-xl font-bold text-white">Is it trending blog ?</p>
                <div className="flex items-center ">
                  <input type="radio" className="w-[50%] h-9 rounded-sm pl-3 text-lg font-semibold" name="radioOption" checked={trending === "yes"} onChange={handleTrending} value="yes" />
                  <label htmlFor="radioOption" className="mr-4 text-base font-semibold">Yes</label>
                  <input type="radio" className="w-[50%] h-9 rounded-sm pl-3 text-lg font-semibold" name="radioOption" checked={trending === "no"} onChange={handleTrending} value="no" />
                  <label htmlFor="radioOption" className="text-base font-semibold">No</label>
                </div>
              </div>
              {/* Dropdown */}
              <div className="">
                <select value={category} onChange={onCategoryChange} className="w-[50%] h-9 rounded-sm pl-3 text-lg font-semibold text-gray-400">
                  <option className="">Please select category...</option>
                  {categoryOptions.map((option, index) => (
                    <option value={option || ""} key={index}>{option}</option>
                  ))}
                </select>
              </div>
              {/* description */}
              <div className="pt-5">
                <textarea className="w-[50%] pl-2 text-lg font-semibold h-40 rounded-sm" placeholder="Description..." value={description} name="description" onChange={handleChange} />
              </div>
              {/* Select file */}
              <div className="py-3">
                <input type="file" className="bg-white w-[50%] text-gray-400 rounded-sm" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              {/* Add Button */}
              <div className="pt-3">
                <button className="bg-orange-600 text-xl font-bold py-2 px-10 cursor-pointer rounded-sm " type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddEditBlog;