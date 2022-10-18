import { TextType } from '../values/TextType.d.js';
import { URIType } from '../values/URIType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';

declare class UIDProperty {
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
    params: (ValueParameter | AnyParameter)[],
    val: URIType | TextType
  );
}

export { UIDProperty };
