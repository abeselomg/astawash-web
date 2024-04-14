import store from "@redux/store";
import "@styles/global.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import { ConfigProvider } from "antd";
import axios from "axios";

function App({ Component, pageProps }: AppProps): JSX.Element {
  axios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  });
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "#143199",
              itemSelectedColor: "#fff",
              itemColor: "#878787",
              itemMarginInline: 8,
            },
            Form: {
              verticalLabelPadding: "0px",
              itemMarginBottom: 12,
            },
          },
          token: {
            colorPrimary: "#143199",
            borderRadius: 8,
            fontFamily: "Poppins",
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
