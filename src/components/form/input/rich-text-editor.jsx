"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/image.min.css";
// import FroalaEditor from "react-froala-wysiwyg";
// import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

// Import plugin tambahan
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), { ssr: false });
const FroalaEditorView = dynamic(() => import("react-froala-wysiwyg/FroalaEditorView"), { ssr: false });

const FroalaEditorComponent = ({ name, setValue, defaultValues = "" }) => {
  const [content, setContent] = useState(defaultValues);

  // Fungsi untuk menangani perubahan konten editor
  const handleModelChange = (model) => {
    setContent(model);
    setValue(name, model);
  };

  return (
    <div>
      <FroalaEditor
        tag="textarea"
        model={content}
        onModelChange={handleModelChange}
        config={{
          placeholderText: "Start typing here...",
          charCounterCount: true, // Mengaktifkan penghitung karakter
          toolbarButtons: [
            "bold", // Bold
            "italic", // Italic
            "underline", // Underline
            "strikeThrough", // Strike-through
            "|",
            "fontSize", // Font size dropdown
            "paragraphFormat", // Heading/Paragraph dropdown
            "|",
            "align", // Dropdown untuk alignment
            "|",
            "formatOL", // Ordered list
            "formatUL", // Unordered list
            "|",
            "insertImage", // Insert image
            "|",
            "undo", // Undo
            "redo", // Redo
            "|",
            "indent",
            "outdent",
          ],
          imageUpload: true, // Mengaktifkan upload gambar
        }}
      />

      <h3>Preview:</h3>
      {content.length > 0 && (
        <div className="w-full border-2 border-slate-700 rounded-md py-2 px-4">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {/* <FroalaEditorView model={content} /> */}
        </div>
      )}
    </div>
  );
};

export default FroalaEditorComponent;
