import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import TextColor from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import { EditorOptions } from '@tiptap/react';
import Toolbar from './Toolbar';
import Heading from '@tiptap/extension-heading';
import Typography from '@tiptap/extension-typography';


interface Props {
  value: string;
  onChange: (e: string) => void;
  showCounts?:
    | boolean
    | ((characters: number, words: number) => React.ReactNode);
}


const TiptapEditor = ({ value, onChange, showCounts }: Props) => {

  
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 
          "rounded-md border ps-4 pt-2 w-[300px] md:w-[360px] min-h-[300px] border-input bg-background-white focus:ring-offset-2 disables:cursor-not-allowed disabled:opacity-50"
      }
    },
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: "heading",
        },
          levels: [1, 2, 3],
      }),
      TextStyle,
      TextColor,
      FontFamily,
      OrderedList,
      BulletList,
      Underline,
      Typography,
      image.configure({
        HTMLAttributes:{
          class: "editor-image",
        }
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "editor-link",
        },
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      })
      

    ],
    content: value, // Initialize with the `value` prop
      onUpdate: ({ editor }) => {
      const content = editor.getText();
      onChange(content); // Notify parent component of changes
    },
  });
  React.useEffect(() => {
    if (editor && editor.getText() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);


  if (!editor) {
    return null
  };

  return (
    <div className='flex flex-col justify-stretch min-h-[250px]'>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
        {showCounts &&
        typeof showCounts === "function" &&
        showCounts(editor.getCharacterCount(), editor.storage.characterCount.words)}
    </div>
  )
  
};

export default TiptapEditor;