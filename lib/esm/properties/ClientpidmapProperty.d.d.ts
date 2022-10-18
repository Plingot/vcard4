import { SpecialValueType } from '../values/SpecialValueType.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';

declare class ClientpidmapProperty {
  readonly params: string;
  readonly paramsXML: string;
  readonly paramsJSON: {};
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: {}[];
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  constructor(params: AnyParameter[], val: SpecialValueType);
}

export { ClientpidmapProperty };
