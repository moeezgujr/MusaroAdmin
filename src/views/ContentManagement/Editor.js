import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadApi } from "Apis/Trend";
import Skeleton from "react-loading-skeleton"; // If you want to use a library for skeleton loading

const MyEditor = ({ value, setValue, cb, id }) => {
  const [editorContent, setEditorContent] = useState(""); 
  const [loading, setLoading] = useState(true); // State for loading
  const [timerExpired, setTimerExpired] = useState(false); // Timer for 5 seconds
  
  // Synchronize state with incoming value
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 5 seconds
      setTimerExpired(true);
    }, 200); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  // Handle content changes in the editor
  const handleEditorChange = (content, editor) => {
    setValue(content); // Save editor content to state
  };

  // Custom image handler for file selection and upload
  const imageHandler = useCallback(async (callback) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const dto = await uploadApi(file);
      const url = dto.data.url.replace("trends/", "temp/");

      callback(process.env.REACT_APP_IMAGE_SRC + url);
      cb(dto.data.url, id);
    };
  }, []);

  return (
    <div>
      {loading ? (
        // Skeleton Loader for the first 5 seconds
        <Skeleton height={500} width="100%" />
      ) : (
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js" // Local TinyMCE script
          license_key="gpl"
          apiKey="gpl" // Optional for free usage
          value={editorContent}
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
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview | rtl",
            automatic_uploads: true,
            file_picker_types: "image media",
            images_file_types: "jpg, jpeg, png, svg, gif",
            file_picker_callback: (cb, value, modalType) => {
              if (modalType.filetype === "image") {
                imageHandler(cb);
              }
            },
          }}
        />
      )}
    </div>
  );
};

export default MyEditor;
