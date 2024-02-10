import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePrec, setFilePrec] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (file) {
      handelFileUpload(file);
    }
  }, [file]);

  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  //FireBase Storge
  /* allow read;
  allow write : if 
  request.resource.size < 2 *1024 * 1024 &&
  request.resource.contentType.matches('images/.*') */
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (Image must be less than 2 mb)
            </span>
          ) : filePrec > 0 && filePrec < 100 ? (
            <span>{`Uploading ${filePrec} %`}</span>
          ) : filePrec === 100 ? (
            <span className="text-green-700">Image Successfuly Updated</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="user name"
          id="username"
          className="border p-3 rounded-lg "
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg "
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg "
        />
        <button className="text-bold bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Acount</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
