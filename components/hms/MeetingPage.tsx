"use client"

import { generateSecureToken } from '@/actions/hms';
import { TokenData } from '@/utils/types';
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { Session } from 'next-auth';
import React from 'react'
import VideoCallUi from './VideoCallUi';
import VideoCallFooter from './VideoCallFooter';


const MeetingPage = ({roomId, session}: {roomId: string; session: Session}) => {

    const hmsActions = useHMSActions();
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const [token, setToken] = React.useState<string | null>(null);
    const user = session.user
    const role = user.role

    const username = role==="DOCTOR" ? `Dr.${user.name}` : user.name;

    React.useEffect(() => {
        const getToken = async () => {
            const tokenData: TokenData = { 
                roomId,
                userName: username??"", // Use the actual logged-in user's name
                role: role==="DOCTOR"?"host":"guest", // or 'host' for doctors
            }
            const data = await generateSecureToken(tokenData);

            if (data.token) {
                setToken(data.token);
            }
        };

        getToken();
    }, [roomId]);

    React.useEffect(() => {
        if (token && !isConnected) {
            hmsActions.join({
                authToken: token,
                userName: username??"", // set based on user role
            });
        }
    }, [token, isConnected, hmsActions])



  return (

        <div className='m-0 p-0 font-semibold bg-[#262238] text-slate-100'>
            {isConnected ? (
                <div>
                    <h2>Video Call: Room {roomId}</h2>
                    <VideoCallUi />
                    <VideoCallFooter />
                </div>
            ) : (
                <p>Connecting to the room...</p>
            )}
        </div>

  )
}

export default MeetingPage