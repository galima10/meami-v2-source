// jest.setup.ts
(global as any).__DEV__ = true;

jest.mock("react-native-reanimated", () => {
  return {
    useSharedValue: (initial: number) => {
      let val = initial;
      return {
        get value() {
          return val;
        },
        set value(v: number) {
          val = v;
        },
      };
    },
    useAnimatedStyle: (fn: any) => fn(),
    withTiming: (
      toValue: any,
      _config: any,
      callback?: (finished: boolean) => void
    ) => {
      if (callback) callback(true); // simulate end of animation
      return toValue;
    },
    withRepeat: (animation: any) => animation,
    withSequence: (animation: any) => animation,
    withDelay: (_delay: any, animation: any) => animation,
    Easing: { bezier: () => {}, out: () => {} },
    addWhitelistedUIProps: () => {},
    runOnJS:
      (fn: any) =>
      (...args: any[]) =>
        fn(...args),
    default: { call: () => {} },
  };
});

jest.mock("react-native-svg", () => {
  const React = require("react");
  return {
    __esModule: true,
    Svg: (props: any) => React.createElement("svg", props),
    Path: (props: any) => React.createElement("path", props),
    Circle: (props: any) => React.createElement("circle", props),
    Rect: (props: any) => React.createElement("rect", props),
    G: (props: any) => React.createElement("g", props),
    // Ajoute d'autres si besoin (Line, Ellipse, Polygon, Polyline, etc.)
  };
});

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: (cb: any) => {
    const React = require("react");
    React.useEffect(cb, []);
  },
}));

jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn(() => ({
      width: 400,
      height: 800,
      scale: 2,
      fontScale: 2,
    })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  Platform: {
    OS: "test",
    select: jest.fn(),
  },
  // tu peux mocker d'autres trucs dont tu as besoin ici
}));
