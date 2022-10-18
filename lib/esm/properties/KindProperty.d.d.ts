import { SpecialValueType } from '../values/SpecialValueType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';

declare class KindProperty {
  readonly params: string;
  readonly paramsXML: string;
  readonly paramsJSON: {};
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: {}[];
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  constructor(params: (ValueParameter | AnyParameter)[], val: SpecialValueType);
}

export { KindProperty };
