import React, { useRef, useState } from "react";

type selectFile = (file: File, url: string) => void

interface UploadInputProps {
  isAudio: boolean;
  onSelectFile: selectFile;
}

export default function UploadInput(props: UploadInputProps) {
  const [video, setLocalVideo] = useState('');
  const videoRef = useRef<HTMLInputElement>(null);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setLocalVideo(url);

    if (props.onSelectFile) {
      props.onSelectFile(file, url);
    }
  };

  return (
    <div
      onClick={() => {
        // @ts-ignore
        videoRef.current.click();
      }}
      className={
        video
        ? " w-96   rounded-md  h-64 items-center justify-center flex"
        : "border-2 dark:border-gray-600  w-96 border-dashed border-borderWhiteGray rounded-md mt-8   h-64 items-center justify-center flex"
      }
      >
      {video ? (
        <>
          {props.isAudio ? (
            <audio src={video} controls className="w-full h-full" />
          ) : (
            <video controls src={video} className="h-full rounded-md"/>
          )}
        </>
        ) : (
          <p className="dark:text-[#9CA3AF]">
            Upload {props.isAudio ? "Audio" : "Video"}
          </p>
          )}
          <input 
            type='file'
            className='hidden'
            ref={videoRef}
            accept={props.isAudio ? "audio/*" : "video/*"}
            onChange={handleInput}
          />
    </div>
  );
}

