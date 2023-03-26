import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  tab1: false,
  tab2: true,
  tab3: true,
  activekey: "1"
};

const disabledTabsSlice = createSlice({
    initialState,
    name: 'disabledTabs',
    initialState,
    reducers: {
      setTabDisabled: (state, action) => {
        const { tabKey, isDisabled } = action.payload;
        state[tabKey] = isDisabled;

        if(tabKey == "tab1"){
          state["activekey"] = 1;
        }

        if(tabKey == "tab2"){
          state["activekey"] = 2;
        }
        
        if(tabKey == "tab3"){
          state["activekey"] = 3;
        }
      }
    }
  });

  export const { setTabDisabled } = disabledTabsSlice.actions;
  export default disabledTabsSlice.reducer;