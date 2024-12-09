import { Pencil, Plus, X } from 'lucide-react';
import React from 'react'



const ArrayInput = ({
    setItems,
    items = [],
    itemTitle,
}: {
    setItems: (items: string[]) => void;
    items: string[];
    itemTitle: string;
}) => {

    const [item, setItem] = React.useState("")
    const [showTagForm, setShowTagForm] = React.useState(false)

    const addItem = () => {
        if (!item) return;
        setItems([...items, item]);
        setItem(""); 
    }
    const removeItem = (index: any) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }

  return (

    <div className='sm:col-span-2 col-span-full mt-4 -space-y-2'>
        {showTagForm ? (
            <div className='flex items-center'>
                <div className='relative w-full'>
                    <div className='absolute inset-y-0 start-0 flex items-center
                    ps-3 pointer-events-none'>
                        <Pencil className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                    </div>
                    <input 
                        value={item} 
                        onChange={(e) => setItem(e.target.value)}
                        type='text'
                        id="voice-serach"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                        ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500'
                        placeholder={`Create ${itemTitle}`} 
                    />
                </div>
                <button 
                    onClick={addItem} 
                    type='button' 
                    className='shrink-0 inline-flex items-center py-2.5 px-3 ms-2
                    text-sm font-medium text-white bg-blue-700 rounded-lg border
                    border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700'>
                    <Plus className='w-4 h-4 me-2' />
                    Add
                </button>
                <button 
                    type='button' 
                    onClick={() => setShowTagForm(false)}
                    className='ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full 
                    flex items-center justify-center'
                >
                    <X className='w-4 h-4' />
                </button>
            </div>
        ) : (
            <button 
                onClick={() => setShowTagForm(true)} 
                type='button'
                className='flex items-center space-x-2 text-slate-800 
                dark:text-slate-300 py-2 px-4'
            >
                <Plus />
                <span>Add {itemTitle}</span>
            </button>
        )}
        <div className='flex flex-wrap gap-4'>
            {items.map((item, i) => {
                return (
                    <div 
                        onClick={() => removeItem(i)} 
                        key={i}
                        className='bg-blue-200 flex space-x-2 items-center
                        dark:bg-slate-600 mt-4 px-4 py-2 rounded-lg cursor-pointer
                        text-sm text-slate-800 dark:text-slate-200'
                    >
                        <span>{item}</span>
                        <X className='w-4 h-4' />
                    </div>
                )
            })}
        </div>
    </div>

  )
}

export default ArrayInput