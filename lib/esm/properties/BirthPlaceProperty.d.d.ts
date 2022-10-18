import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { TextType } from '../values/TextType.d.js';
import { URIType } from '../values/URIType.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';

declare class BirthPlaceProperty {
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
      | LanguageParameter
      | AltidParameter
      | AnyParameter
    )[],
    val: TextType | URIType
  );
}

export { BirthPlaceProperty };
