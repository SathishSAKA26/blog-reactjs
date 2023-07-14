import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase";
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';
import Trending from '../components/Trending';

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() })
    });
    setTrendBlogs(trendBlogs);
  }

  useEffect(() => {
    getTrendingBlogs();
    const unSub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      }, (error) => {
        console.log(error);
      }
    );
    return () => {
      unSub();
      getTrendingBlogs();
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
        toast.success("Blogs deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log("blogs", blogs);

  return (
    <div className='text-center text-white mx-6'>
      <div className="titles-section">
        <div className="trending-title">
          <Trending blogs={trendBlogs} />
          <div className="flex justify-between">
            <div className="blogs-section w-[70%]">
              <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
            </div>
            <div className="tags-most w-[25%]">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;