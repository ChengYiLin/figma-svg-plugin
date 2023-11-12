import { showUI } from "@create-figma-plugin/utilities";

import handleSelectedSVG from "./handler/selectedSVG";

export default function () {
  showUI({
    height: 400,
    width: 360,
  });

  figma.on("selectionchange", () => {
    const currentSelection = figma.currentPage.selection[0];

    if (!!currentSelection) {
      handleSelectedSVG(currentSelection);
    }
  });
}
