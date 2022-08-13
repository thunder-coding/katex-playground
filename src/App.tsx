import { useState, Fragment } from "react";
import "./App.css";
import "katex/dist/katex.css";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import katex from "katex";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="textarea-wrapper">
      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          let err = "";
          try {
            setOutput(
              (err = katex.renderToString(event.target.value, {
                throwOnError: true,
              }))
            );
          } catch (err) {
            setOutput(
              (err as unknown as Error).message
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
            );
          }
        }}
      />
      <div id="output" dangerouslySetInnerHTML={{ __html: output }}></div>
      <button
        onClick={() => {
          htmlToImage
            .toJpeg(document.getElementById("output") as HTMLElement, {
              backgroundColor: "white",
              cacheBust: true,
            })
            .then((dataURL) => {
              let img = new Image();
              img.src = dataURL;
              download(dataURL, "image.jpg", "data:image/jpeg;base64");
            })
            .catch((err) => {
              alert("fuck");
            });
        }}
      >
        Download
      </button>
    </div>
  );
}

export default App;
