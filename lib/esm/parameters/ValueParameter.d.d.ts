import { TextType } from '../values/TextType.d.js';
import { TextListType } from '../values/TextListType.d.js';
import { BooleanType } from '../values/BooleanType.d.js';
import { DateTimeType } from '../values/DateTimeType.d.js';
import { DateTimeListType } from '../values/DateTimeListType.d.js';
import { IntegerType } from '../values/IntegerType.d.js';
import { IntegerListType } from '../values/IntegerListType.d.js';
import { FloatType } from '../values/FloatType.d.js';
import { FloatListType } from '../values/FloatListType.d.js';
import { LanguageTagType } from '../values/LanguageTagType.d.js';
import { URIType } from '../values/URIType.d.js';
import { SexType } from '../values/SexType.d.js';
import { SpecialValueType } from '../values/SpecialValueType.d.js';

declare class ValueParameter {
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: string[];
  repr(): string;
  reprXML(): string;
  reprJSON(): Record<string, string | string[]>;
  constructor(
    valType:
      | TextType
      | TextListType
      | BooleanType
      | DateTimeType
      | DateTimeListType
      | IntegerType
      | IntegerListType
      | FloatType
      | FloatListType
      | LanguageTagType
      | URIType
      | SexType
      | SpecialValueType
  );
}

export { ValueParameter };
