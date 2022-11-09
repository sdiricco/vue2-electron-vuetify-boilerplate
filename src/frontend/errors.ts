interface Options {
    details: string,
    type: string,
    code: number
}

export class ElectronError extends Error {
    public details: string ;
    public type: string;
    public code: number;

    constructor(message: string);
    constructor(message: string, options?: Options) {
      super(message);
      this.name = "ElectronError";
      this.details = options?.details ?? '';
      this.type = options?.type ?? '';
      this.code = options?.code ?? 0;
    }
  }

  