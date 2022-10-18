import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { TextType } from '../values/TextType.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';
import { LevelParameter } from '../parameters/LevelParameter.d.js';

declare class InterestProperty {
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
      | TypeParameter
      | AnyParameter
      | IndexParameter
      | LevelParameter
    )[],
    val: TextType
  );
}

export { InterestProperty };
