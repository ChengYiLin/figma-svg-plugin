type EventType<T extends EventName, U> = {
  type: T;
  data: U;
};

export type EventName = "GET_ICON_NAME";

export type FigmaSVGEvent = EventType<"GET_ICON_NAME", { name: string }>;
