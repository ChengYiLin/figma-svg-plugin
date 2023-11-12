import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import "!./style/output.css";
import { FigmaSVGEvent } from "../types/event";

function Plugin() {
  const [selectedSVG, setSelectedSVG] = useState<string | undefined>();

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage as FigmaSVGEvent;

      switch (type) {
        case "GET_ICON_NAME":
          setSelectedSVG(data.name);
          break;
      }
    };
  }, []);

  return (
    <main class="p-2">
      <h1 class="text-xl font-bold mb-2">SVG-Worker</h1>

      <div class="py-2">
        <p class="text-sm">Selected SVG : {selectedSVG ?? "--"}</p>
      </div>
    </main>
  );
}

export default render(Plugin);
