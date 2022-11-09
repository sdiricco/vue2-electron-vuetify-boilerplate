import { ipcRenderer, MessageBoxOptions, MessageBoxReturnValue } from "electron";
import { ElectronError } from "./errors";
import * as ENDPOINTS from "../constants/endpoints"
import {ReturnValueMessageBox} from "../types/types"

export async function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue>{
    const r: ReturnValueMessageBox = await ipcRenderer.invoke(ENDPOINTS.ELECTRON_SHOW_MESSAGE_BOX, options);
    if (r.error) {
      throw new ElectronError(r.errorMessage);
    }
    return r.data;
  }
  