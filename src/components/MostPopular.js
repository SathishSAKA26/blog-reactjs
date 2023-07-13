import React from 'react';
import { useNavigate } from "react-router-dom";

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-2xl font-bold text-start py-3">Most Popular</div>
      <hr className="text-gray-600 pb-2" />
      {blogs?.map((item) => (
        <div className="cursor-pointer flex" key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
          <div className="py-2">
            <img src={item.imgUrl} alt={item.title} className="h-20 w-28 rounded-md" />
          </div>
          <div className="pl-4 pt-4">
            <div className="text-start font-medium">{item.title}</div>
            <div className="text-start text-sm text-gray-500">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MostPopular;