import { useState, useRef } from "react"
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Markup } from 'interweave';
import use18n from "i18n/use18n";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}


function QuillEditor({ value, setValue }) {
  const t = use18n();

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getHTML())
    console.log(editor.getHTML(), "..............", content)
  }

  return (
    <div>
      <ReactQuill modules={modules} value={value} onChange={handleChange} formats={formats} theme="snow" />
      {/* <div style={{ marginTop: "20px" }}>
        <span
          className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
        >
          {t["232"]}
        </span>
        <div style={{ background: "white", border: "1px solid #d2d2d2", marginTop: "4px" }}>
          <Markup content={value} />
        </div>
      </div> */}
    </div>
  )
}

export default QuillEditor;
