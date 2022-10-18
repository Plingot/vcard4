import { IntegerType } from './IntegerType.d.js';
import { TextListType } from './TextListType.d.js';
import { TextType } from './TextType.d.js';
import { SexType } from './SexType.d.js';
import { URIType } from './URIType.d.js';

declare class SpecialValueType {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: (string | string[])[];
  repr(): string;
  reprXML(): string;
  reprJSON(): (string | string[])[];
  constructor(value: (TextType | TextListType)[], targetProp: string);
  constructor(value: [SexType, TextType], targetProp: string);
  constructor(value: [IntegerType, URIType], targetProp: string);
  constructor(value: string, targetProp: string);
}

export { SpecialValueType };
