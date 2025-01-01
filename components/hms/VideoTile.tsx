"use client"

import { HMSPeer, selectVideoTrackByPeerID, useHMSStore, useVideo } from '@100mslive/react-sdk'
import React, { useRef } from 'react'


const VideoTile = ({peer}: {peer: HMSPeer}) => {

    const { videoRef } = useVideo({
        trackId: peer.videoTrack
      });

  return (

    <div className="grid place-items-center gap-4">
        <div className=''>
            <video
            ref={videoRef}
            className={`h-[550px] w-full object-cover rounded-md mb-4`}
            autoPlay
            muted
            playsInline
            />
            <div className="text-base text-center">
            {peer.name} {peer.isLocal ? "(You)" : ""}
            </div>
        </div>
    </div>

  )
}

export default VideoTile