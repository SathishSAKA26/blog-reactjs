import React, { useEffect, useState } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';

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

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, trending, category, description } = form;


  // image upload progress
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      }, (error) => {
        console.log(error);
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            alert("The Image upload completed successfully")
            setForm((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blog", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  console.log('form', form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending && file) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid
          })
          alert("Blogs created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid
          })
          alert("Blogs updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return alert("All fields are mandatory to fill");
    }

    navigate("/");
  };

  return (
    <div className='pt-16 text-center text-white'>
      <div className="main-container">
        <div className="">
          <div className="text-2xl font-extrabold">
            {id ? "Update Blogs" : "Create Blogs"}
          </div>
        </div>
        <div className="create">
          <section className="input-container">
            <form className="input" onSubmit={handleSubmit}>
              {/* title */}
              <div className="py-3">
                <input
                  type="text"
                  className="w-[50%] h-9 rounded-sm pl-3 text-lg font-semibold text-black"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              {/* tags */}
              <div className="w-full">
                <div className="w-[50%] py-3 mx-auto text-lg font-semibold">
                  <ReactTagInput
                    tags={tags}
                    placeholder='Tags...'
                    onChange={handleTags}
                  />
                </div>
              </div>
              {/* radio button */}
              <div className="py-2 flex items-center justify-around px-28 mx-10">
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
                <textarea className="w-[50%] pl-2 text-lg font-semibold h-40 rounded-sm text-black" placeholder="Description..." type="text" value={description} name="description" onChange={handleChange} />
              </div>
              {/* Select file */}
              <div className="py-3">
                <input type="file" className="bg-white w-[50%] text-gray-400 rounded-sm" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              {/* Add Button */}
              <div className="pt-3">
                <button className="bg-orange-600 text-xl font-bold py-2 px-10 cursor-pointer rounded-sm " type="submit" disabled={progress !== null && progress < 100}>
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddEditBlog;