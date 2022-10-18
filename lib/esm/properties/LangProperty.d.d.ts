import { LanguageTagType } from '../values/LanguageTagType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class LangProperty {
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
      | PrefParameter
      | AltidParameter
      | PIDParameter
      | TypeParameter
      | AnyParameter
      | IndexParameter
    )[],
    val: LanguageTagType
  );
}

export { LangProperty };
