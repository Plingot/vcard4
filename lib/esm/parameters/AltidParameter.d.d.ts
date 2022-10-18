import { TextType } from '../values/TextType.d.js';
import { IntegerType } from '../values/IntegerType.d.js';

declare class AltidParameter {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: (string | number | bigint)[];
  repr(): string;
  reprXML(): string;
  reprJSON(): Record<string, string | string[]>;
  constructor(altidValue: IntegerType | TextType);
}

export { AltidParameter };
