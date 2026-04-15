import theme from "@constants/themes";

export const dayColors: {
  [dayKey: string]: string
} = {
  monday: theme.properties.lightOrange,
  tuesday: theme.properties.lightGreen,
  wednesday: theme.properties.lightYellow,
  thursday: theme.properties.lightRed,
  friday: theme.properties.lightPink,
  saturday: theme.properties.lightPurple,
  sunday: theme.properties.white,
}