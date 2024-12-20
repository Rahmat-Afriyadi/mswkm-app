import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Stylesheet React-Quill

const CustomToolbarExample = () => {
  const [value, setValue] = useState("");

  // Konfigurasi custom toolbar
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Style teks
      [{ list: "ordered" }, { list: "bullet" }], // List terurut dan tidak terurut
      [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentasi
      [{ align: [] }], // Alignment teks
      ["link", "image", "video"], // Tambahkan tautan, gambar, dan video
      ["clean"], // Hapus format
    ],
  };

  // Konfigurasi theme
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <h2>React Quill dengan Custom Toolbar</h2>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Tulis teks Anda di sini..."
      />
      <h4>Konten:</h4>
      <div className="w-full border-2 border-black rounded-lg px-4">
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

export default CustomToolbarExample;
