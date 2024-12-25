import { Editor } from '@tiptap/react'
import React from 'react'
import { Toggle } from '../ui/toggle'
import { Bold, Heading2, Heading3, ImageIcon, Italic, Link, LinkIcon, List, ListOrdered, Quote, Sparkles, Strikethrough, Underline } from 'lucide-react'


type Props = {
    editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {

    const [selectedLink, setSelectedLink] = React.useState('');
    const [imageInput, setImageInput] = React.useState('');
    const [aiGeneratedText, setAiGeneratedText] = React.useState<string>("");

    if (!editor) {
        return null;
    };

    const addImage = () => {
        if (imageInput) {
            editor.chain().focus().setImage({ src: imageInput }).run();
            setImageInput('');
        }
    }
    
    const handleLinkToggle = () => {
        const  { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');

        if (!selectedText.trim()) {
            alert('Please select a text to create a link');
            return;
        }

        setSelectedLink(selectedText); // Set the selected text
        
        if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run(); // Remove the link if already active
            
        } else {
            const url = selectedText.startsWith('http') ? selectedText : `https//${selectedText}`;
            editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank'}).run();
            
        }
        
    }

    const generateAIText = async () => {
      
      };

  return (

    <div className='border border-input bg-transparent w-[300px] md:w-[360px] rounded-md p-1'>
        <div className='grid grid-cols-9'>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading")}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading")}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("aigenerate")}
                onPressedChange={generateAIText}
            >
                <Sparkles className='h-4 w-4'/>
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("link")}
                onPressedChange={handleLinkToggle}
                onChange={() => setSelectedLink(editor.getText())}
            >
                <Link className='h-4 w-4'/>
            </Toggle>
            <div className='flex items-center'>
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className="input input-sm h-5 w-32  rounded-sm placeholder:text-sm"
                    />
                <Toggle size="sm" onPressedChange={addImage}>
                    <ImageIcon className="h-4 w-4" />
                </Toggle>
            </div>
        </div>
    </div>

  )
}

export default Toolbar