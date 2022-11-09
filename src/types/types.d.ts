import { MessageBoxReturnValue } from "electron";

export type ReturnValueMessageBox = {
    error: boolean,
    errorMessage: string,
    data: MessageBoxReturnValue
}

export type MenuEventOptions = {
    id: string,
    label: string,
    type: string,
    checked: string,
    role: string,
    accelerator: string,
    sublabel: string,
    toolTip: string,
    enabled: string,
    visible: boolean,
    acceleratorWorksWhenHidden: boolean,
    registerAccelerator: boolean,
    commandId: string,
  }
