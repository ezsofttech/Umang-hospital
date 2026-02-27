"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
};

function ToolBtn({ active, disabled, onClick, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault(); // keep editor focus
        onClick();
      }}
      className={`flex h-8 w-8 items-center justify-center rounded text-sm transition
        ${active
          ? "bg-[var(--umang-navy)] text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-[var(--umang-navy)]"}
        ${disabled ? "cursor-not-allowed opacity-40" : ""}
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-gray-200" />;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[var(--umang-teal)] underline" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder ?? "Write your content here…" }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus:outline-none text-gray-800",
      },
    },
  });

  // sync external value changes (e.g. when loading edit data)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value && value !== undefined) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const addLink = () => {
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[var(--umang-teal)] focus-within:ring-1 focus-within:ring-[var(--umang-teal)]">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">

        {/* Heading select */}
        <select
          title="Paragraph style"
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
              ? "h2"
              : editor.isActive("heading", { level: 3 })
              ? "h3"
              : "p"
          }
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: Number(v[1]) as 1 | 2 | 3 }).run();
          }}
          className="h-8 rounded border border-gray-300 bg-white px-2 text-xs text-gray-700 focus:outline-none"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <Divider />

        {/* Inline formatting */}
        <ToolBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold (Ctrl+B)">
          <strong>B</strong>
        </ToolBtn>
        <ToolBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic (Ctrl+I)">
          <em>I</em>
        </ToolBtn>
        <ToolBtn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline (Ctrl+U)">
          <span className="underline">U</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
          <span className="line-through">S</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
          <span className="font-mono text-xs">`c`</span>
        </ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          <i className="fi fi-sr-list text-base leading-none" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
          <i className="fi fi-sr-list-ol text-base leading-none" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
          <i className="fi fi-sr-quote-right text-base leading-none" />
        </ToolBtn>
        <ToolBtn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code block">
          <i className="fi fi-sr-code text-base leading-none" />
        </ToolBtn>

        <Divider />

        {/* Text align */}
        <ToolBtn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align left">
          <i className="fi fi-sr-align-left text-base leading-none" />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align center">
          <i className="fi fi-sr-align-center text-base leading-none" />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align right">
          <i className="fi fi-sr-align-right text-base leading-none" />
        </ToolBtn>

        <Divider />

        {/* Link */}
        <ToolBtn active={editor.isActive("link")} onClick={addLink} title="Add / edit link">
          <i className="fi fi-sr-link text-base leading-none" />
        </ToolBtn>

        <Divider />

        {/* Rule / clear */}
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
          <span className="text-base font-bold">—</span>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear formatting">
          <i className="fi fi-sr-eraser text-base leading-none" />
        </ToolBtn>

        {/* Undo / Redo pushed to right */}
        <div className="ml-auto flex items-center gap-0.5">
          <ToolBtn disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
            <i className="fi fi-sr-undo text-base leading-none" />
          </ToolBtn>
          <ToolBtn disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">
            <i className="fi fi-sr-redo text-base leading-none" />
          </ToolBtn>
        </div>
      </div>

      {/* ── Editor area ── */}
      <EditorContent editor={editor} />
    </div>
  );
}
