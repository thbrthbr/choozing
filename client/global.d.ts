declare namespace NodeJS {
  interface Global {
    require: NodeRequire;
  }
}

interface NodeRequire {
  context: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: string,
  ) => {
    keys: () => string[];
    (id: string): any;
  };
}
