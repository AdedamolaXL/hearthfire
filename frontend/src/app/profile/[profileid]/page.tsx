'use client'

import React, {useEffect, useState} from 'react';

import { useParams } from "next/navigation";
import GoalForm from './section/GoalForm';

export type Profile = {
  id: string;
}

const Profile = () => {
  const params = useParams();
  const profileid = params.profileid;
  // console.log(profileid);

  return (
    <>
      <div>{profileid}</div>
      <GoalForm />
    </>
  )
}

 
export default Profile;