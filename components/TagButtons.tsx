import { Video } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const TagButtons = () => {


  return (

    <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Button variant={"outline"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>100ms</span>
          </Button>
          <Button variant={"outline"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>Google Meet</span>
          </Button>
          <Button variant={"outline"} className='rounded-full'>
            <Video /><span className='text-sm font-light'>Zoom</span>
          </Button>   
        </label>
    </div>

  )
}

export default TagButtons