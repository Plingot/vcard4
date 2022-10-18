import { TextType } from './TextType.d.js';

declare class TextListType {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: string[];
  repr(): string;
  reprXML(): string;
  reprJSON(): string[];
  constructor(textlist: TextType[]);
}

export { TextListType };
