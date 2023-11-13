import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import "!./style/output.css";
import { FigmaSVGEvent } from "../types/event";
import { useSVG } from "./hooks/useSVG";

function Plugin() {
  const [selectedSVG, setSelectedSVG] = useState<string | undefined>();
  const [svgString, setSVGString] = useState<string | undefined>();

  const { isLoading, postSVGData, data: svgCode } = useSVG();

  useEffect(() => {
    if (svgString && selectedSVG) {
      postSVGData({
        code: svgString,
        options: {
          typescript: true,
          prettier: true,
          prettierConfig: {
            semi: true,
          },
        },
      });
    }
  }, [svgString]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage as FigmaSVGEvent;

      switch (type) {
        case "GET_ICON_NAME":
          setSelectedSVG(data.name);
          break;

        case "GET_ICON_SVG_STRING":
          setSVGString(data.svg);
          break;
      }
    };
  }, []);

  return (
    <main class="p-2">
      <h1 class="text-xl font-bold mb-2">SVG-Worker</h1>

      <div class="py-2">
        <p class="text-sm">
          <b>Selected SVG :</b> {selectedSVG ?? "--"}
        </p>

        <div class="py-4">
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <code>{svgCode?.output ?? "null"}</code>
          )}
        </div>
      </div>
    </main>
  );
}

export default render(Plugin);
