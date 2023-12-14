import localFont from "next/font/local";

export const sfprodisplay = localFont({
  src: [
    {
      path: "./sf-pro-display/SF-Pro-Display-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./sf-pro-display/SF-Pro-Display-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./sf-pro-display/SF-Pro-Display-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./sf-pro-display/SF-Pro-Display-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
