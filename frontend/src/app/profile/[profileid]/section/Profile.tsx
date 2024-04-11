import React from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";

const ProfileSection: React.FC = () => {
  const params = useParams();
  const profileid = params.profileid;

  return (
    <div className="bg-gray-100 w-full">
      {/* Profile Image */}
      <img src="profile-img-url" alt="Profile" className="rounded-full h-20 w-20 mx-auto mb-4" />

      {/* Profile Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-gray-500">Role:</span>
          <span className="text-green-500">Premium</span> {/* Assuming Premium user */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-2.293 3.293a1 1 0 011.414 0L10 7.586l1.879-1.879a1 1 0 111.414 1.414L11.414 9l1.879 1.879a1 1 0 01-1.414 1.414L10 10.414l-1.879 1.879a1 1 0 01-1.414-1.414L8.586 9 6.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-500">{profileid}</p>
      </div>

      {/* Banner Header */}
      <div className="bg-gray-300 p-2 mt-4 text-center">
        <h3 className="text-lg font-semibold">Welcome to your profile!</h3>
      </div>
    </div>
  );
};

export default ProfileSection;
