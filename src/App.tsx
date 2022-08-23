import { useState, Fragment } from "react";
import "./App.css";
import "katex/dist/katex.css";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import katex from "katex";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('24');
  return (
    <div className="textarea-wrapper">
      <textarea
        value={input}
        rows={10}
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
      <div id="output" style={{backgroundColor, color: foregroundColor, fontSize: fontSize + 'px'}} dangerouslySetInnerHTML={{ __html: output }}></div>
      <input type="color" value={backgroundColor} name="background" onChange={(event)=>{setBackgroundColor(event.target.value)}} />
      <input type="color" value={foregroundColor} name="foreground" onChange={(event)=>{setForegroundColor(event.target.value)}} />
      <input type="range" value={fontSize} min="24" max="72" step="1" onChange={(event)=>{setFontSize(event.target.value)}} />
      <button
        onClick={() => {
          htmlToImage
            .toJpeg(document.getElementById("output") as HTMLElement, {
              cacheBust: true,
            })
            .then((dataURL) => {
              let img = new Image();
              img.src = dataURL;
              download(dataURL, "image.jpg");
            })
            .catch((err) => {
              alert("Unexpected error encountered, please report a bug.");
            });
        }}
      >
        Download
      </button>
    </div>
  );
}

export default App;
