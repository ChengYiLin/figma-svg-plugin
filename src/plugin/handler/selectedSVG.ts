import { FigmaSVGEvent } from "../../types/event";

export default function handleSelectedSVG(selectedSVG: SceneNode) {
  console.log(selectedSVG);

  const getIconEvent: FigmaSVGEvent = {
    type: "GET_ICON_NAME",
    data: { name: selectedSVG.name },
  };

  figma.ui.postMessage(getIconEvent);
}
