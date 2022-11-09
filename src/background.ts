import { ipcMain } from "electron";
import * as appMenu from "./backend/appMenu";
import * as electronWrapper from "./backend/electronWrapper"
import {WindowWrapper} from "./backend/WindowWrapper";
import {AppWrapper} from "./backend/AppWrapper";
import * as ENDPOINTS from "./constants/endpoints"

const windowWrapper = new WindowWrapper()
const appWrapper = new AppWrapper(windowWrapper)

/*************************************************************************************/
/* APP API */
/*************************************************************************************/

ipcMain.handle("render/ready", async () => {
  appMenu.create(appWrapper.instance, windowWrapper.instance, onClickMenuItem);
});

ipcMain.handle(ENDPOINTS.ELECTRON_SHOW_MESSAGE_BOX, async (_evt, options)=> {
  return await electronWrapper.showMessageBox(windowWrapper.instance, options)
})

function onClickMenuItem(data:any) {
  windowWrapper.send(`menu/${data.options.id}`, {
    options: data.options,
  });
}


