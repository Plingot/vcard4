import { URIType } from '../values/URIType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { MediatypeParameter } from '../parameters/MediatypeParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class PhotoProperty {
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
      | AltidParameter
      | TypeParameter
      | MediatypeParameter
      | PrefParameter
      | IndexParameter
      | PIDParameter
      | AnyParameter
    )[],
    val: URIType
  );
}

export { PhotoProperty };
