import type { Href } from "expo-router";

// Database
export const QUANTITY_SCALE: number = 100;

// Styles
export const FONT_BASE = 16;
export const TYPE_SCALE = 1.25;

// App
export const SPLASH_SCREEN_DELAY = 1; // 5 sec

// Routes
export const ROUTES: {
  [tabKey: string]: {
    [routeKey: string]: Href;
  };
} = {
  menu: {
    calendar: "/menuTab/MenuCalendarScreen",
    list: "/menuTab/MenuListScreen",
    modify: "/menuTab/MenuModifyScreen",
  },
};
