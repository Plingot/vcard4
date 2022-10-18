import { TextType } from '../values/TextType.d.js';
import { TextListType } from '../values/TextListType.d.js';

declare class SortAsParameter {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: string[];
  repr(): string;
  reprXML(): string;
  reprJSON(): Record<string, string | string[]>;
  constructor(sortValue: TextType | TextListType);
}

export { SortAsParameter };
