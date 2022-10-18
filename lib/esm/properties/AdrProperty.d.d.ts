import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { SpecialValueType } from '../values/SpecialValueType.d.js';
import { GeoParameter } from '../parameters/GeoParameter.d.js';
import { TzParameter } from '../parameters/TzParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { LabelParameter } from '../parameters/LabelParameter.d.js';
import { CCParameter } from '../parameters/CCParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class AdrProperty {
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
      | LanguageParameter
      | ValueParameter
      | PrefParameter
      | AltidParameter
      | PIDParameter
      | TypeParameter
      | GeoParameter
      | TzParameter
      | AnyParameter
      | LabelParameter
      | CCParameter
      | IndexParameter
    )[],
    val: SpecialValueType
  );
}

export { AdrProperty };
