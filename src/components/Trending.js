import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Trending = ({ blogs }) => {
  const options = {
    loop: true,
    margin: 10,
    nev: true,
    Response: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      }
    }
  }

  return (
    <>
      <div className="">
        <div className="text-2xl font-bold text-start py-3">Trending Blogs</div>
        <hr className="text-gray-600 pb-2" />
      </div>
      <OwlCarousel className="owl-theme" {...options}>
        {blogs?.map((item) => (
          <div className="item px-2" key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className="overflow-hidden z-[5] cursor-pointer">
                <div className="h-[326px] overflow-hidden relative">
                  <img src={item.imgUrl} alt={item.title} className="h-[400px] min-w-full relative" />
                </div>
                <div className="absolute h-full w-full top-0 right-0 z-[7]"></div>
                <div className="absolute w-full z-[9] p-[10px] bottom-0">
                  <span className="text-white">{item.title}</span>
                  <div className="trending-meta-info">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </>
  )
}

export default Trending;