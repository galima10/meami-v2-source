import { View, type ViewProps } from 'react-native';
import { ReactNode } from 'react';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  children?: ReactNode; // Ajout explicite de la propriété `children`
  style?: any;
};

export function ThemedView({ style, lightColor, darkColor, children, ...otherProps }: ThemedViewProps) {
  return (
    <View style={style} {...otherProps}>
      {children}
    </View>
  );
}