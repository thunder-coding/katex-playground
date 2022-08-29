import { useState, Fragment } from "react";
import "./App.css";
import "katex/dist/katex.css";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import katex from "katex";

import "./Footer.component";
import Footer from "./Footer.component";

function App() {
  const [input, setInput] = useState(
    localStorage.getItem("katex-code") ||
      `\\text{If } x_1 \\text{ and } x_2 \\text{ are the roots of the equation } f(x) = x^2 + 6x + 8,\\text{ such that } x_1 > x_2\\text{, then find the value of }{x_1}^{x_2}\\newline
\\text{Solution:} \\newline
f(x) = x^2 + 6x + 8 = 0\\newline
\\Rightarrow x^2 + 4x + 2x + 8 = 0\\newline
\\Rightarrow x(x + 4) + 2(x + 4)\\newline
\\Rightarrow (x + 2)(x + 4) = 0 \\newline
\\Rightarrow x = -2, -4\\newline
\\Rightarrow x_1 = -2, x_2 = -4\\newline
\\Rightarrow {x_1}^{x_2} \\newline
\\Rightarrow {-2}^{-4} \\newline
\\Rightarrow { 1 \\over {-2}^{4}} \\newline
\\Rightarrow { 1 \\over (-2) \\times (-2) \\times (-2) \\times (-2)} \\newline
\\Rightarrow { 1 \\over 16 } \\newline`
  );
  const [output, setOutput] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("background") || "#ffffff"
  );
  const [foregroundColor, setForegroundColor] = useState(
    localStorage.getItem("foreground") || "#000000"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontsize") || "24"
  );
  return (
    <>
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
            } finally {
              localStorage.setItem("katex-code", event.target.value);
            }
          }}
        />
        <div
          id="output"
          style={{
            backgroundColor,
            color: foregroundColor,
            fontSize: fontSize + "px",
          }}
          dangerouslySetInnerHTML={{ __html: output }}
        ></div>
        <input
          type="color"
          value={backgroundColor}
          name="background"
          onChange={(event) => {
            setBackgroundColor(event.target.value);
            localStorage.setItem("background", event.target.value);
          }}
        />
        <input
          type="color"
          value={foregroundColor}
          name="foreground"
          onChange={(event) => {
            setForegroundColor(event.target.value);
            localStorage.setItem("foreground", event.target.value);
          }}
        />
        <input
          type="range"
          value={fontSize}
          min="24"
          max="72"
          step="1"
          onChange={(event) => {
            setFontSize(event.target.value);
            localStorage.setItem("fontsize", event.target.value);
          }}
        />
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
      <Footer />
    </>
  );
}

export default App;
