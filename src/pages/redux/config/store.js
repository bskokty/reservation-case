import { configureStore } from "@reduxjs/toolkit";  
import disabledTabsSlice from "./tabsSlice"

const store = configureStore({
    reducer:{ 
        disabledTabs: disabledTabsSlice
    }
})

export default store;