import React from 'react';

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="">
        <div className="text-2xl font-bold text-start py-3">Tags</div>
        <hr className="text-gray-600 pb-2" />
      </div>
      <div className="flex flex-wrap justify-between pt-2">
        {tags?.map((tag, index) => (
          <p className="cursor-pointer text-white font-medium hover:bg-slate-500 rounded-sm px-2" key={index}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;