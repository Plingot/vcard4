import { URIType } from '../values/URIType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';

declare class ContactURIProperty {
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
    params: (ValueParameter | PrefParameter | IndexParameter)[],
    val: URIType
  );
}

export { ContactURIProperty };
