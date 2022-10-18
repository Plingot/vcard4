import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { TextType } from '../values/TextType.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class FNProperty {
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
      | TypeParameter
      | LanguageParameter
      | AltidParameter
      | PIDParameter
      | PrefParameter
      | IndexParameter
      | AnyParameter
    )[],
    val: TextType
  );
}

export { FNProperty };
