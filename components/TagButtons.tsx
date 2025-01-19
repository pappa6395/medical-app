import { Video } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const TagButtons = () => {


  return (

    <div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 cursor-pointer">
          <Button variant={"review"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>100ms</span>
          </Button>
          <Button variant={"review"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>Zoom</span>
          </Button>
          <Button variant={"review"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>Google Meet</span>
          </Button>   
        </div>
    </div>

  )
}

export default TagButtons