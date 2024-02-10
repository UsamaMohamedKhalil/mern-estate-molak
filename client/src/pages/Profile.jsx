import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />
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
          Upate
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Acount</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
