import { FigmaSVGEvent } from "../../types/event";

export default async function handleSelectedSVG(selectedSVG: SceneNode) {
  // Step1. Get Selected Icon Name
  const getIconEvent: FigmaSVGEvent = {
    type: "GET_ICON_NAME",
    data: { name: selectedSVG.name },
  };

  figma.ui.postMessage(getIconEvent);

  // Step2. Transfer Selected Icon to SVG
  const iconSVGString = await selectedSVG.exportAsync({ format: "SVG_STRING" });
  const getIconSVGEvent: FigmaSVGEvent = {
    type: "GET_ICON_SVG_STRING",
    data: { svg: iconSVGString },
  };

  figma.ui.postMessage(getIconSVGEvent);
}
