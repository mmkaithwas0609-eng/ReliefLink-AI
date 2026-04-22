import type en from "@/messages/en";

type WidenLeafStrings<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<WidenLeafStrings<U>>
    : T extends object
      ? { [K in keyof T]: WidenLeafStrings<T[K]> }
      : T;

export type TranslationMessages = WidenLeafStrings<typeof en>;
