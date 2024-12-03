import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [data, error, isLoading] = useFetch("/user/myProfile");
  useEffect(() => {
    setProfile(data);
  }, [data]);
  return (
    <div className="outerDiv">
      <div className="innerDiv min-h-screen bg-pink-300">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-white px-10  mt-10">
            {profile && profile.profile && (
              <div>
                <div className="text-2xl  font-bold">{profile.profile.name}</div>
                <div className="text-xl font-medium">{profile.profile.title}</div>
                <div className="font-normal">{profile.profile.email}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;