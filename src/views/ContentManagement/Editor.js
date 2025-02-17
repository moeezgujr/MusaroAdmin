import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadApi } from "Apis/Trend";

const MyEditor = ({value,setValue,cb,id}) => {
  const [editorContent, setEditorContent] = useState(""); 
  useState(()=>{
     setEditorContent(value)
  },[value])
  const handleEditorChange = (content, editor) => {
    setValue(content); // Save editor content to state
  };
  const imageHandler = useCallback(async (callback) => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async () => {
      const file = input.files[0];
      const dto = await uploadApi(file);
      const url = dto.data.url.replace("trends/", "temp/");

      callback(process.env.REACT_APP_IMAGE_SRC + url); cb(dto.data.url, id);
    };
  }, []);
  return (
    <div>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js" // Reference local tinymce script
        license_key="gpl"
        apiKey="gpl" // Optional for free usage
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            'media',
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | preview | rtl",
          // imagetools_cors_hosts: ["mycmsappstorage.blob.core.windows.net"],
          // upload settings
          automatic_uploads: true,
          // image upload
          file_picker_types: "image media",
          images_file_types: "jpg, jpeg, png, svg, gif",
          file_picker_callback: (cb, valodl, modalType) => {
            if (modalType.filetype === "image") {
              imageHandler(cb);
            } else if (modalType.filetype === "media") {
              // imageFilePicker(cb, "media");
            }
          },
        }}
      />
    </div>
  );
};

export default MyEditor;
