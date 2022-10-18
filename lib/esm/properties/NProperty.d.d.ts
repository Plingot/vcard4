import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { SpecialValueType } from '../values/SpecialValueType.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { SortAsParameter } from '../parameters/SortAsParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';

declare class NProperty {
  readonly params: string;
  readonly paramsXML: string;
  readonly paramsJSON: {};
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: {}[];
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  constructor(
    params: (
      | ValueParameter
      | SortAsParameter
      | LanguageParameter
      | AltidParameter
      | AnyParameter
    )[],
    val: SpecialValueType
  );
}

export { NProperty };
