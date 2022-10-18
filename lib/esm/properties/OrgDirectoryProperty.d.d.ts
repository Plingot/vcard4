import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { URIType } from '../values/URIType.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class OrgDirectoryProperty {
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
      | PrefParameter
      | AltidParameter
      | PIDParameter
      | TypeParameter
      | AnyParameter
      | IndexParameter
    )[],
    val: URIType
  );
}

export { OrgDirectoryProperty };
