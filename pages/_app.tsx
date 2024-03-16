import store from "@redux/store";
import "@styles/global.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
