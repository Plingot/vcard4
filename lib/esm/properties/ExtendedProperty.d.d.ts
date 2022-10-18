import { LanguageParameter } from '../parameters/LanguageParameter.d.js';
import { ValueParameter } from '../parameters/ValueParameter.d.js';
import { PrefParameter } from '../parameters/PrefParameter.d.js';
import { AltidParameter } from '../parameters/AltidParameter.d.js';
import { PIDParameter } from '../parameters/PIDParameter.d.js';
import { TypeParameter } from '../parameters/TypeParameter.d.js';
import { MediatypeParameter } from '../parameters/MediatypeParameter.d.js';
import { CalscaleParameter } from '../parameters/CalscaleParameter.d.js';
import { SortAsParameter } from '../parameters/SortAsParameter.d.js';
import { GeoParameter } from '../parameters/GeoParameter.d.js';
import { TzParameter } from '../parameters/TzParameter.d.js';
import { AnyParameter } from '../parameters/AnyParameter.d.js';
import { LabelParameter } from '../parameters/LabelParameter.d.js';
import { CCParameter } from '../parameters/CCParameter.d.js';
import { IndexParameter } from '../parameters/IndexParameter.d.js';
import { LevelParameter } from '../parameters/LevelParameter.d.js';
import { TextType } from '../values/TextType.d.js';
import { TextListType } from '../values/TextListType.d.js';
import { BooleanType } from '../values/BooleanType.d.js';
import { DateTimeType } from '../values/DateTimeType.d.js';
import { IntegerType } from '../values/IntegerType.d.js';
import { FloatType } from '../values/FloatType.d.js';
import { LanguageTagType } from '../values/LanguageTagType.d.js';
import { URIType } from '../values/URIType.d.js';
import { SexType } from '../values/SexType.d.js';
import { SpecialValueType } from '../values/SpecialValueType.d.js';

declare class ExtendedProperty {
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
    prop: string,
    params: (
      | LanguageParameter
      | ValueParameter
      | PrefParameter
      | AltidParameter
      | PIDParameter
      | TypeParameter
      | MediatypeParameter
      | CalscaleParameter
      | SortAsParameter
      | GeoParameter
      | TzParameter
      | AnyParameter
      | LabelParameter
      | CCParameter
      | IndexParameter
      | LevelParameter
    )[],
    val:
      | TextType
      | TextListType
      | BooleanType
      | DateTimeType
      | IntegerType
      | FloatType
      | LanguageTagType
      | URIType
      | SexType
      | SpecialValueType
  );
}

export { ExtendedProperty };
