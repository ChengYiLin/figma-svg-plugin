type EventType<T extends EventName, U> = {
  type: T;
  data: U;
};

export type EventName = "GET_ICON_NAME" | "GET_ICON_SVG_STRING";

export type FigmaSVGEvent =
  | EventType<"GET_ICON_NAME", { name: string }>
  | EventType<"GET_ICON_SVG_STRING", { svg: string }>;
