import { useState, useEffect } from "preact/hooks";
import { FigmaSVGEvent } from "../../types/event";

export function useSVGPluginMessage() {
  const [selectedSVG, setSelectedSVG] = useState<string | undefined>();
  const [svgString, setSVGString] = useState<string | undefined>();

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

  return {
    selectedSVG,
    svgString,
  };
}
