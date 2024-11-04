// Importing helper modules
import { uploadApi } from "Apis/Trend";
import { useCallback, useMemo, useRef } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";

const Editor = ({ setValue, value, cb, id }) => {

  
  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }

  const imageHandler = useCallback(async () => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async () => {
      const file = input.files[0];
      const dto = await uploadApi(file);
      const quillEditor = quill.current.getEditor();
      const range = quillEditor.getSelection(true);
      const url = dto.data.url.replace("trends/", "temp/");
      quillEditor.insertEmbed(
        range.index,
        "image",
        process.env.REACT_APP_IMAGE_SRC + url,
        "user"
      );
      cb(dto.data.url, id);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}> {/* Scrollable Container */}
      <QuillEditor
        ref={(el) => (quill.current = el)}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={setValue}
        style={{ height: "100%" }} // Ensure full height usage within the container
      />
    </div>
  );
};

export default Editor;
