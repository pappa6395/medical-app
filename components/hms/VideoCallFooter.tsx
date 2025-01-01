
import { selectIsConnectedToRoom, selectLocalPeer, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { LogOut, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function VideoCallFooter() {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
  } = useAVToggle();

    const router = useRouter();
    const hmsActions = useHMSActions();
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const localPeer = useHMSStore(selectLocalPeer);
    const isIntentionalLeave = React.useRef(false);
    const returnUrl = "/dashboard"

    const handleLeaveRoom = async () => {

        try {
            if (!isConnected || !localPeer) {
                router.push(returnUrl); 
                return;
            };
            
            isIntentionalLeave.current = true;

            if (isConnected) {
                await Promise.all([
                    hmsActions.setLocalAudioEnabled(false),
                    hmsActions.setLocalVideoEnabled(false)
                ])
            }
            
            const tracks = 
                [
                localPeer?.audioTrack,
                localPeer?.videoTrack,
            ].filter(Boolean);
            
            await Promise.all(
                tracks.map(track => hmsActions.removeTrack(track??""))
            );
            
            await hmsActions.leave();
            
            router.push(returnUrl); 

        } catch (err) {
            console.error("Failed to leave the room or stop tracks", err);
            try {
                await hmsActions.leave();
            } catch (e) {
                console.error("Failed final cleanup:", e);
            };
            
            router.push(returnUrl);
        };
    };

    React.useEffect(() => {
        
        return () => {
            
            if (isIntentionalLeave.current && isConnected && localPeer) {
                const cleanup = async () => {
                    
                    try {
                        hmsActions.setLocalAudioEnabled(false);
                        hmsActions.setLocalVideoEnabled(false);

                        if (localPeer) {
                            if (localPeer.audioTrack) {
                                await hmsActions.removeTrack(localPeer.audioTrack);
                            }
                            if (localPeer.videoTrack) {
                                await hmsActions.removeTrack(localPeer.videoTrack);
                            }
                            await hmsActions.leave();
                        }

                    } catch (err) {
                        if (err !== "Client is not connected") {
                            console.error("Cleanup failed:", err);
                        }
                    }
                };

                cleanup();
            }
        };
    }, [hmsActions, isConnected, localPeer]);
  
   

  return (
    <div className="flex fixed bottom-0 w-full gap-6 p-6 justify-center items-center z-10">
      <button 
        className="border self-center
      border-[#37474f] w-16 h-16 rounded-full 
      bg-[#607d8b] shadow-sm cursor-pointer" 
        onClick={toggleAudio}
        >
        {isLocalAudioEnabled ? <Mic className="place-self-center w-8 h-8"/> : <MicOff className="place-self-center w-8 h-8"/> }
      </button>
      <button 
        className="border self-center
      border-[#37474f] w-16 h-16 rounded-full text-center 
      bg-[#607d8b] shadow-sm cursor-pointer" 
        onClick={toggleVideo}
        >
        {isLocalVideoEnabled ? <Video className="place-self-center w-8 h-8"/> : <VideoOff className="place-self-center w-8 h-8"/>}
      </button>
      <button 
        className="border self-center
      border-[#37474f] w-16 h-16 rounded-full text-center 
      bg-[#f44238] shadow-sm cursor-pointer" 
        onClick={handleLeaveRoom}
        >
        <LogOut className="place-self-center w-8 h-8" />
      </button>
    </div>
  );
}

export default VideoCallFooter;