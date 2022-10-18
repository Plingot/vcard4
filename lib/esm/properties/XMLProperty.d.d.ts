import { TextType } from '../values/TextType.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';

declare class XMLProperty {
  readonly params: string;
  readonly paramsXML: string;
  readonly paramsJSON: {};
  readonly value: string;
  readonly valueXML: string;
  readonly valueJSON: {}[];
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  constructor(params: (ValueParameter | AltidParameter)[], val: TextType);
}

export { XMLProperty };
