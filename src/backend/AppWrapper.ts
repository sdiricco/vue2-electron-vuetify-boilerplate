import { app, protocol, BrowserWindow } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import EventEmitter from "eventemitter3";

const nodeEnv = process.env.NODE_ENV;
const isTest = process.env.IS_TEST;
const isDev = nodeEnv !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

export class AppWrapper extends EventEmitter {
  windowWrapper: any;
  instance: Electron.App;
  constructor(windowWrapper: any) {
    super();
    this.windowWrapper = windowWrapper;

    this.instance = app;

    this.onAllWindowsClosed = this.onAllWindowsClosed.bind(this);
    this.onActivate = this.onActivate.bind(this);
    this.onReady = this.onReady.bind(this);
    this.listenProcessEvents = this.listenProcessEvents.bind(this);

    this.instance.on("window-all-closed", this.onAllWindowsClosed);
    this.instance.on("activate", this.onActivate);
    this.instance.on("ready", this.onReady);

    this.listenProcessEvents();
  }

  listenProcessEvents() {
    if (!isDev) {
      return;
    }
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit") {
          /* app.quit(); */
        }
      });
    } else {
      process.on("SIGTERM", () => {
        this.instance.quit();
      });
    }
  }
  // Quit when all windows are closed.
  onAllWindowsClosed() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      this.instance.quit();
    }
  }
  onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.windowWrapper.create();
    }
  }
  async onReady() {
    if (isDev && !isTest) {
      try {
        await installExtension(VUEJS_DEVTOOLS);
      } catch (e: any) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }
    this.windowWrapper.create();
  }
}