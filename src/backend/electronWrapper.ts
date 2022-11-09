import { dialog, MessageBoxReturnValue, MessageBoxOptions, BrowserWindow } from "electron";

interface ReturnValueMessageBox {
  data?: MessageBoxReturnValue,
  error: boolean,
  errorMessage: string,
}

/* SHOW MESSAGE BOX */
export async function showMessageBox(win: BrowserWindow , options: MessageBoxOptions ){
  let r: ReturnValueMessageBox = {error: false, errorMessage: ''}
  console.log('options', options);
  console.log('win', win);
  
  try {
    r.data = await dialog.showMessageBox(win, options);
  } catch (e:any) {
    r.error = true;
    r.errorMessage = e.message;
  }
  console.log("r",r);
  return r;
}


  