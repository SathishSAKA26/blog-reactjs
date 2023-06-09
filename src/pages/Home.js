import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
        setActive("home");
      }, (error) => {
        console.log(error);
      }
    );
    return () => {
      unSub();
    };
  }, []);

  if (loading) {
    return <Spinner />
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are  you sure wanted to delete that blog")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log("blogs", blogs);

  return (
    <div className='pt-16 text-center text-white mx-6'>
      <div className="titles-section">
        <div className="trending-title">
          <h2 className="">Trending Blogs</h2>
          <div className="flex justify-between">
            <div className="blogs-section">
              <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
            </div>
            <div className="tags-most">
              <h2 className="">Tags</h2>
              <h2 className="">Most Popular</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;