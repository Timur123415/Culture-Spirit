import ReactDOM from "react-dom/client"
import React from "react"
import { App } from "./App"
import './index.css'
import { Provider } from "react-redux"
import { store } from "./store/store"
import { BrowserRouter } from "react-router"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
        <App/>
        </Provider>
        </BrowserRouter>
    </React.StrictMode>
)