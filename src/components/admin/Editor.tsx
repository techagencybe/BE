"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  Highlighter,
  Undo,
  Redo,
  Type,
  Maximize2,
  Settings2,
  Info
} from "lucide-react";
import { useState } from "react";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  title,
  disabled = false,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
      isActive
        ? "bg-[#00BAFF] text-white shadow-[0_0_20px_rgba(0,186,255,0.3)] scale-110"
        : "text-black/40 hover:bg-black/5 hover:text-black hover:scale-105"
    } disabled:opacity-30 disabled:hover:scale-100`}
  >
    {children}
  </button>
);

export default function Editor({ content, onChange }: EditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Typography,
      Highlight.configure({ multicolor: true }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-[32px] max-w-full h-auto my-12 border border-black/[0.05] shadow-2xl mx-auto block",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#00BAFF] font-black underline decoration-2 underline-offset-4 cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor focus:outline-none max-w-4xl mx-auto min-h-[600px] px-8 py-16 text-black",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className={`
      relative w-full bg-white border border-black/[0.08] rounded-[40px] overflow-hidden transition-all duration-500
      ${isFullscreen ? "fixed inset-0 z-[9999] rounded-none border-none" : "shadow-sm hover:shadow-2xl"}
    `}>
      {/* Top Bar - WordPress Style */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.05] sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
              <Undo size={18} />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
              <Redo size={18} />
            </ToolbarButton>
          </div>
          
          <div className="w-px h-6 bg-black/[0.05] mx-2" />
          
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive("heading", { level: 1 })}
              title="H1"
            >
              <Heading1 size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive("heading", { level: 2 })}
              title="H2"
            >
              <Heading2 size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive("heading", { level: 3 })}
              title="H3"
            >
              <Heading3 size={18} />
            </ToolbarButton>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-3 rounded-2xl bg-black/[0.03] text-black/40 hover:text-black hover:bg-black/5 transition-all"
          >
            <Maximize2 size={18} />
          </button>
          <div className="w-px h-6 bg-black/[0.05] mx-1" />
          <button type="button" className="p-3 rounded-2xl bg-black/[0.03] text-black/40 hover:text-black transition-all">
            <Settings2 size={18} />
          </button>
        </div>
      </div>

      {/* Floating Main Toolbar */}
      <div className="sticky top-[73px] z-10 px-6 py-3 bg-white/80 backdrop-blur-md border-b border-black/[0.03] flex items-center justify-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Highlight"
        >
          <Highlighter size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-black/[0.08] mx-2" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Left"
        >
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Center"
        >
          <AlignCenter size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-black/[0.08] mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullets"
        >
          <List size={18} />
        </ToolbarButton>
        
        <ToolbarButton onClick={setLink} isActive={editor.isActive("link")} title="Link">
          <LinkIcon size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Image">
          <ImageIcon size={18} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-black/[0.08] mx-2" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Code"
        >
          <Code size={18} />
        </ToolbarButton>
      </div>

      {/* Editor Content Area */}
      <div className={`overflow-y-auto ${isFullscreen ? "h-[calc(100vh-120px)]" : "max-h-[800px]"}`}>
        <EditorContent editor={editor} />
      </div>
      
      {/* Status Bar */}
      <div className="px-10 py-4 bg-white border-t border-black/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-6 text-[11px] font-black text-black/20 uppercase tracking-widest">
          <span className="flex items-center gap-2"><Info size={14} /> Ready to Publish</span>
          <div className="w-1 h-1 rounded-full bg-black/10" />
          <span>Auto-saving enabled</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 text-[10px] font-black text-black/40 uppercase tracking-widest">
          <Type size={12} className="text-[#00BAFF]" /> 
          Drafting Mode
        </div>
      </div>

      <style jsx global>{`
        .tiptap-editor {
          color: #000000 !important;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .tiptap-editor h1 {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #000;
        }
        .tiptap-editor h2 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #000;
        }
        .tiptap-editor h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
        }
        .tiptap-editor p {
          margin-bottom: 1.5rem;
          color: #333;
        }
        .tiptap-editor blockquote {
          border-left: 6px solid #00BAFF;
          padding: 2rem 3rem;
          margin: 3rem 0;
          background: rgba(0, 186, 255, 0.05);
          border-radius: 0 2rem 2rem 0;
          font-size: 1.25rem;
          font-style: italic;
          color: #000;
        }
        .tiptap-editor ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-bottom: 2rem;
        }
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-bottom: 2rem;
        }
        .tiptap-editor li {
          margin-bottom: 0.5rem;
        }
        .tiptap-editor mark {
          background-color: #00BAFF;
          color: white;
          padding: 0.2em 0.4em;
          border-radius: 0.4em;
        }
        .tiptap-editor code {
          background: #f1f1f1;
          padding: 0.2em 0.4em;
          border-radius: 0.4em;
          font-family: monospace;
          font-size: 0.9em;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(0, 0, 0, 0.2);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
