import { selectIsConnectedToRoom, selectLocalPeer, selectPeers, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import React from 'react'
import VideoTile from './VideoTile';


const VideoCallUi = () => {

    const hmsActions = useHMSActions();
    const peers = useHMSStore(selectPeers);
    const localPeer = useHMSStore(selectLocalPeer);
    const isConnected = useHMSStore(selectIsConnectedToRoom);


    const leaveRoom = async () => {
        await hmsActions.leave();
    };

    if (!isConnected) {
        return <p>Connecting to the room...</p>;
    }


  return (

    <div className='flex flex-col h-screen'>
        <h2>Conference</h2>
        <div className='flex-grow grid grid-cols-3 items-center gap-4 p-4'>
            {peers.map((peer) => {
                return (
                    <VideoTile key={peer.id} peer={peer}/>
                )
            })}
        </div>
        <div className='flex justify-center space-x-4 bg-gray-800 text-white'>
            
        </div>
    </div>

  )
}

export default VideoCallUi