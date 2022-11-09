////////////////////////////////////// Global Requires \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import { Menu, BrowserWindow, App, MenuItem, } from "electron";
import {MenuEventOptions} from "../types/types"
import * as R from "ramda";

////////////////////////////////////// Global Constants \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const isMac = process.platform === "darwin";

////////////////////////////////////// Global Variables \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let defaultTemplate: any = [];
let template: any = [];

////////////////////////////////////// Global Functions \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export function buildMenuFromTemplate(window: BrowserWindow, template: Array<MenuItem>) {
  const menu = Menu.buildFromTemplate(template);
  window.setMenu(menu);
}

export function create(app: App, window: BrowserWindow, onClickItem: Function) {
  let __template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    {
      label: "File",
      submenu: [
        {
          id: "file/new",
          label: "New",
          click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: any) => onClickItem({
            options: optionsFiltered(menuItem),
            menuItem: menuItem,
            browserWindow: browserWindow,
            event: event
          }),
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "togglefullscreen" },
        { role: "minimize" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ type: "separator" }, { role: "close" }]),
      ],
    },
  ];
  template = R.clone(__template);
  defaultTemplate = R.clone(__template);
  buildMenuFromTemplate(window, template);
}

function optionsFiltered(menuItem:any): MenuEventOptions {
  return {
    id: menuItem.id,
    label: menuItem.label,
    type: menuItem.type,
    checked: menuItem.checked,
    role: menuItem.role,
    accelerator: menuItem.accelerator,
    sublabel: menuItem.sublabel,
    toolTip: menuItem.toolTip,
    enabled: menuItem.enabled,
    visible: menuItem.visible,
    acceleratorWorksWhenHidden:
      menuItem.acceleratorWorksWhenHidden,
    registerAccelerator: menuItem.registerAccelerator,
    commandId: menuItem.commandId,
  };
}

////////////////////////////////////// Exports \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\