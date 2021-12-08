const {
  MissingArgument,
  InvalidArgument,
} = require('./errors');

// Abstract Base Class for values
class AbstractBaseValue {
  #abstractPropertiesAndMethods = [
    'type',
    'value'
  ];

  checkAbstractPropertiesAndMethods() {
    if (
      !this.#abstractPropertiesAndMethods.every(
        abstractPropertyOrMethod => this.hasOwnProperty(abstractPropertyOrMethod) ||
        Object.getPrototypeOf(this).hasOwnProperty(abstractPropertyOrMethod) ||
        this.constructor.hasOwnProperty(abstractPropertyOrMethod)
      )
    )
    throw new Error('All abstract properties and methods in abstract base class must be defined in child class');
  }

  repr() {
    return this.value;
  }

  constructor() {
    if (this.constructor === AbstractBaseValue)
    throw new Error('Cannot create instance of abstract class');
  }
}

// Values
class TextType extends AbstractBaseValue {
  static type = 'TEXT';

  #validate(textValue) {
    if (typeof textValue === 'undefined')
    throw new MissingArgument('Value for TextType must be supplied');

    else if (typeof textValue !== 'string')
    throw new TypeError('Only type string allowed for TextType value');
  }

  #cleanUp(textValue) {
    return textValue.replaceAll('\\', '\\\\').replaceAll(',', '\\,').replaceAll(':', '\\:').replaceAll(';', '\\;').replaceAll('\n', '\\n');
  }

  constructor(textValue) {
    super();
    this.#validate(textValue);
    this.value = this.#cleanUp(textValue);

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class TextListType extends AbstractBaseValue {
  static type = 'TEXT';

  #validate(textlist) {
    if (typeof textlist === 'undefined')
    throw new MissingArgument('Value for TextListType must be supplied');

    else if (!Array.isArray(textlist))
    throw new TypeError('Invalid type for value of TextListType. It should be an array of TextTypes');

    else if (
      !textlist.every(
        text => text instanceof TextType
      )
    )
    throw new TypeError('Invalid type for value of TextListType. It should be an array of TextTypes');
  }

  constructor(textlist) {
    super();

    this.#validate(textlist);
    this.value = textlist.reduce((accumulatedTextTypes, currentTextType) => {
      accumulatedTextTypes.push(currentTextType.repr());
      return accumulatedTextTypes;
    }, []).join(',');

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class BooleanType extends AbstractBaseValue {
  static type = 'BOOLEAN';

  #validate(boolValue) {
    if (typeof boolValue === 'undefined')
    throw new MissingArgument('boolValue must be supplied');

    else if (typeof boolValue !== 'boolean')
    throw new TypeError('Value for BooleanType should be of type boolean');
  }

  constructor(boolValue) {
    super();

    this.#validate(boolValue);
    this.value = boolValue ? 'TRUE' : 'FALSE';

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class DateTimeType extends AbstractBaseValue {
  #dateRegExp = /^(?:(?:\d{4})|(?:(?:\d{4}(?:(?:(?:0[469]|11)(?:[0-2]\d|30))|(?:(?:0[13578]|1[02])(?:[0-2]\d|3[01]))))|(?:\d{2}(?:(?:(?:[02468][048]|[13579][26])(?:02)(?:[0-2]\d))|(?:(:?\d[13579]|[02468][26]|[13579][048])(?:02)(?:[0-2][0-8])))))|(?:-{2}(?:(?:(?:0[469]|11)(?:[0-2]\d|30)?)|(?:(?:0[13578]|1[02])(?:[0-2]\d|3[01])?)|(?:(?:02)(?:[0-2]\d)?)))|(?:-{3}(?:[0-2]\d|3[01]))|(?:\d{4}-(?:(?:0[1-9])|1[0-2])))$/;

  #timeRegExp = /^(?:(?:(?:(?:[01]\d)|(?:2[0-3]))(?:(?:[0-5]\d){1,2})?)|(?:-(?:[0-5]\d){1,2})|(?:-{2}[0-5]\d))(?:Z|(?:[+-]((?:[01]\d)|(?:2[0-3]))(?:[0-5]\d)?))?$/;

  #dateTimeRegExp = /^(?:(?:(?:\d{4}(?:(?:(?:0[469]|11)(?:[0-2]\d|30))|(?:(?:0[13578]|1[02])(?:[0-2]\d|3[01]))))|(?:\d{2}(?:(?:(?:[02468][048]|[13579][26])(?:02)(?:[0-2]\d))|(?:(:?\d[13579]|[02468][26]|[13579][048])(?:02)(?:[0-2][0-8])))))|(?:-{2}(?:(?:(?:0[469]|11)(?:[0-2]\d|30))|(?:(?:0[13578]|1[02])(?:[0-2]\d|3[01]))|(?:(?:02)(?:[0-2]\d))))|(?:-{3}(?:[0-2]\d|3[01])))(?:T)(?:(?:(?:(?:[01]\d)|(?:2[0-3]))(?:(?:[0-5]\d){1,2})?)(?:Z|(?:[+-]((?:[01]\d)|(?:2[0-3]))(?:[0-5]\d)?))?)$/;

  #dateAndOrTimeRegExp = new RegExp(`(?:${this.#dateRegExp.source}|${this.#timeRegExp.source.replace('^', '^T')}|${this.#dateTimeRegExp.source})`);

  #timestampRegExp = /^(?:(?:\d{4}(?:(?:(?:0[469]|11)(?:[0-2]\d|30))|(?:(?:0[13578]|1[02])(?:[0-2]\d|3[01]))))|(?:\d{2}(?:(?:(?:[02468][048]|[13579][26])(?:02)(?:[0-2]\d))|(?:(:?\d[13579]|[02468][26]|[13579][048])(?:02)(?:[0-2][0-8])))))(?:T)(?:(?:(?:(?:[01]\d)|(?:2[0-3]))(?:[0-5]\d){2})(?:Z|(?:[+-]((?:[01]\d)|(?:2[0-3]))(?:[0-5]\d)?))?)$/;

  #utcOffsetRegExp = /^(?:[+-]((?:[01]\d)|(?:2[0-3]))(?:[0-5]\d)?)$/;

  #validateAndSet(dateTimeValue, type) {
    if (typeof dateTimeValue === 'undefined' || typeof type === 'undefined')
    throw new MissingArgument('Value and type for DateTimeType must be supplied');

    else if (
      !/^(?:(?:date((?:andor)?(?:time))?)|(?:time(?:stamp)?)|(?:utcoffset))$/.test(type)
    )
    throw new InvalidArgument('Accepted values of type for DateTimeType are date, time, datetime, dateandortime, timestamp or utcoffset');

    switch (true) {
      case /^date$/.test(type):
        if (!this.#dateRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type date of DateTimeType');

        this.type = 'DATE';
        this.value = dateTimeValue.toString();
        break;
      case /^time$/.test(type):
        if (!this.#timeRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type time of DateTimeType');

        this.type = 'TIME';
        this.value = dateTimeValue.toString();
        break;
      case /^datetime$/.test(type):
        if (!this.#dateTimeRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type datetime of DateTimeType');

        this.type = 'DATE-TIME';
        this.value = dateTimeValue.toString();
        break;
      case /^dateandortime$/.test(type):
        if (!this.#dateAndOrTimeRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type dateandortime of DateTimeType');

        this.type = 'DATE-AND-OR-TIME';
        this.value = dateTimeValue.toString();
        break;
      case /^timestamp$/.test(type):
        if (!this.#timestampRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type timestamp of DateTimeType');

        this.type = 'TIMESTAMP';
        this.value = dateTimeValue.toString();
        break;
      case /^utcoffset$/.test(type):
        if (!this.#utcOffsetRegExp.test(dateTimeValue))
        throw new InvalidArgument('Invalid value for type utcoffset of DateTimeType');

        this.type = 'UTC-OFFSET';
        this.value = dateTimeValue.toString();
        break;
      default:
        throw new InvalidArgument('Accepted values for type property of type object for DateTimeType are date, time, datetime, dateandortime, timestamp or utcoffset');
    }
  }

  constructor(dateTimeValue, type) {
    super();
    this.#validateAndSet(dateTimeValue, type);

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class DateTimeListType extends AbstractBaseValue {
  #validate(datetimelist) {
    if (typeof datetimelist === 'undefined')
    throw new MissingArgument('Value for DateTimeListType must be supplied');

    else if (!Array.isArray(datetimelist))
    throw new TypeError('Invalid type for value of DateTimeListType. It should be an array of FloatTypes');

    else if (
      !datetimelist.every(
        datetime => datetime instanceof DateTimeType
      )
    )
    throw new TypeError('Invalid type for value of DateTimeListType. It should be an array of DateTimeTypes');

    else if (
      !datetimelist.every(
        datetime => datetime.type === datetimelist[0].type
      )
    )
    throw new TypeError('Invalid type for value of DateTimeListType. It should be an array of DateTimeTypes of the same type');

    else if (
      datetimelist.some(
        datetime => datetime.type === 'UTC-OFFSET'
      )
    )
    throw new TypeError('Invalid type for value of DateTimeListType');
  }

  constructor(datetimelist) {
    super();

    this.#validate(datetimelist);
    this.value = datetimelist.reduce((accumulatedFloatTypes, currentFloatType) => {
      accumulatedFloatTypes.push(currentFloatType.repr());
      return accumulatedFloatTypes;
    }, []).join(',');
    this.type = datetimelist[0].type;

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class IntegerType extends AbstractBaseValue {
  static type = 'INTEGER';

  #validate(intValue) {
    if (typeof intValue === 'undefined')
    throw new MissingArgument('Value for IntegerType must be supplied');

    else if ((typeof intValue !== 'number') && (typeof intValue !== 'bigint'))
    throw new TypeError('Value for IntegerType must be of type number or bigint');

    else if (/\./.test(intValue.toString()))
    throw new InvalidArgument('Invalid value for IntegerType');

    else if (
      (typeof intValue === 'number') &&
      (!((-Number.MAX_SAFE_INTEGER < intValue) &&
      (intValue < Number.MAX_SAFE_INTEGER)))
    )
    throw new InvalidArgument(`The maximum value is ${Number.MAX_SAFE_INTEGER}, and the minimum value is ${Number.MIN_SAFE_INTEGER} for number IntegerType`);

    else if (
      (typeof intValue === 'bigint') &&
      (
        !(
          (-9223372036854775809n < intValue) &&
          (intValue < 9223372036854775808n)
        )
      )
    )
    throw new InvalidArgument('The maximum value is 9223372036854775807n, and the minimum value is -9223372036854775808n for bigint IntegerType');
  }

  constructor(intValue) {
    super();

    this.#validate(intValue);
    this.value = intValue.toString();

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class IntegerListType extends AbstractBaseValue {
  static type = 'INTEGER';

  #validate(integerlist) {
    if (typeof integerlist === 'undefined')
    throw new MissingArgument('Value for IntegerListType must be supplied');

    else if (!Array.isArray(integerlist))
    throw new TypeError('Invalid type for value of IntegerListType. It should be an array of IntegerTypes');

    else if (
      !integerlist.every(
        integer => integer instanceof IntegerType
      )
    )
    throw new TypeError('Invalid type for value of IntegerListType. It should be an array of IntegerTypes');
  }

  constructor(integerlist) {
    super();

    this.#validate(integerlist);
    this.value = integerlist.reduce((accumulatedIntegerTypes, currentIntegerType) => {
      accumulatedIntegerTypes.push(currentIntegerType.repr());
      return accumulatedIntegerTypes;
    }, []).join(',');

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class FloatType extends AbstractBaseValue {
  static type = 'FLOAT';

  #validate(floatValue) {
    if (typeof floatValue === 'undefined')
    throw new MissingArgument('Value for FloatType must be supplied');

    if (
      (
        !(typeof floatValue === 'number') &&
        !/\./.test(floatValue)
      ) ||
      !/^[-+]?\d+\.\d+$/.test(floatValue)
    )
    throw new TypeError('Invalid value for FloatType');
  }

  constructor(floatValue) {
    super();

    this.#validate(floatValue);
    this.value = floatValue.toString();

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class FloatListType extends AbstractBaseValue {
  static type = 'FLOAT';

  #validate(floatlist) {
    if (typeof floatlist === 'undefined')
    throw new MissingArgument('Value for FloatListType must be supplied');

    else if (!Array.isArray(floatlist))
    throw new TypeError('Invalid type for value of FloatListType. It should be an array of FloatTypes');

    else if (
      !floatlist.every(
        float => float instanceof FloatType
      )
    )
    throw new TypeError('Invalid type for value of FloatListType. It should be an array of FloatTypes');
  }

  constructor(floatlist) {
    super();

    this.#validate(floatlist);
    this.value = floatlist.reduce((accumulatedFloatTypes, currentFloatType) => {
      accumulatedFloatTypes.push(currentFloatType.repr());
      return accumulatedFloatTypes;
    }, []).join(',');

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class LanguageTagType extends AbstractBaseValue {
  static type = 'LANGUAGE-TAG';

  #validate(langTagValue) {
    if (typeof langTagValue === 'undefined')
    throw new MissingArgument('Value for LanguageTagType must be supplied');

    else if (typeof langTagValue !== 'string')
    throw new TypeError('Value for LanguageTagType should be of type string');
  }

  constructor(langTagValue) {
    super();

    this.#validate(langTagValue);
    this.value = langTagValue;

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class URIType extends AbstractBaseValue {
  static type = 'URI';

  //Credit for the following regex goes to Jonas Hermsmeier, who got it from Jeff Roberson and added capture groups
  #uriRegExp = new RegExp("([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?");

  #validate(uriValue) {
    if (typeof uriValue === 'undefined')
    throw new MissingArgument('Value for URIType must be supplied');

    else if (typeof uriValue !== 'string')
    throw new TypeError('Value for URIType should be of type string');

    else if (!this.#uriRegExp.test(uriValue))
    throw new InvalidArgument('Invalid URI');
  }

  constructor(uriValue) {
    super();

    this.#validate(uriValue);
    this.value = uriValue;

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class SexType extends AbstractBaseValue {
  static type = 'TEXT';

  #sexRegExp = /^[MFONU]$/;

  #validate(sexValue) {
    if (typeof sexValue === 'undefined')
    throw new MissingArgument('Value for SEXType must be supplied');

    else if (!this.#sexRegExp.test(sexValue))
    throw new InvalidArgument('Invalid sex');
  }

  constructor(sexValue) {
    super();

    this.#validate(sexValue);
    this.value = sexValue;

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

class SpecialValueType extends AbstractBaseValue {
  #validate(value, targetProp) {
    if (
      (typeof value === 'undefined') ||
      (typeof targetProp === 'undefined')
    )
    throw new MissingArgument('Type, value and target property for SpecialValueType must be supplied');

    const valueRegExp = /^(?:individual|group|org|location|application|A-GNSS|A-GPS|AOA|best-guess|Cell|DBH|DBH_HELO|Derived|Device-Assisted_A-GPS|Device-Assisted_EOTD|Device-Based_A-GPS|Device-Based_EOTD|DHCP|E-CID|ELS-BLE|ELS-WiFi|GNSS|GPS|Handset_AFLT|Handset_EFLT|Hybrid_A-GPS|hybridAGPS_AFLT|hybridCellSector_AGPS|hybridTDOA_AOA|hybridTDOA_AGPS|hybridTDOA_AGPS_AOA|IPDL|LLDP-MED|Manual|MBS|MPL|NEAD-BLE|NEAD-WiFi|networkRFFingerprinting|networkTDOA|networkTOA|NMR|OTDOA|RFID|RSSI|RSSI-RTT|RTT|TA|TA-NMR|Triangulation|UTDOA|Wiremap|802\.11|x-[A-Za-z0-9]+)$/i;

    switch (true) {
      case /^(?:Begin|End)Property$/i.test(targetProp):
        if (value !== 'VCARD')
        throw new InvalidArgument(`Invalid value for SpecialValueType for ${/^Begin/i.test(targetProp) ? 'Begin' : 'End'}Property`);

        break;
      case /^KindProperty$/i.test(targetProp):
        if (
          (typeof value !== 'string') ||
          !valueRegExp.test(value)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for KindProperty');

        break;
      case /^NProperty$/i.test(targetProp):
        if (
          !Array.isArray(value) &&
          (value.length !== 5)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for NProperty. It should be an array with a length of 5');

        for (let index = 0; index < value.length; index++)
        if (value[index])
        if (
          !(value[index] instanceof TextType) &&
          !(value[index] instanceof TextListType)
        )
        throw new TypeError('Invalid value for SpecialValueType for NProperty. The items in the array, if present, should be of type TextType or TextListType');

        break;
      case /^GenderProperty$/i.test(targetProp):
        if (
          !Array.isArray(value) &&
          (value.length !== 2)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for GenderProperty. It should be an array with a length of 2');

        else if (
          value[0] &&
          !(value[0] instanceof SexType)
        )
        throw new TypeError('Invalid value for SpecialValueType for GenderProperty. The first item in the array, if present, should be of type SexType');

        else if (
          (!value[0] && !value[1]) ||
          (
            value[1] &&
            !(value[1] instanceof TextType)
          )
        )
        throw new TypeError('Invalid value for SpecialValueType for GenderProperty. The second item in the array, if present, should be of type TextType');

        break;
      case /^AdrProperty$/i.test(targetProp):
        if (
          !Array.isArray(value) &&
          (value.length !== 7)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for AdrProperty. It should be an array with a length of 7');

        for (let index = 0; index < value.length; index++)
        if (value[index])
        if (!(value[index] instanceof TextType))
        throw new TypeError('Invalid value for SpecialValueType for AdrProperty. The items in the array, if present, should be of type TextType');

        break;
      case /^OrgProperty$/i.test(targetProp):
        if (
          !Array.isArray(value) ||
          !(value.length >= 1)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for OrgProperty. It should be an array with at least one item');

        for (let index = 0; index < value.length; index++)
        if (value[index])
        if (!(value[index] instanceof TextType))
        throw new TypeError('Invalid value for SpecialValueType for OrgProperty. The items in the array, if present, should be of type TextType');

        break;
      case /^ClientpidmapProperty$/i.test(targetProp):
        if (
          !Array.isArray(value) &&
          (value.length !== 2)
        )
        throw new InvalidArgument('Invalid value for SpecialValueType for ClientpidmapProperty. It should be an array with a length of 2');

        else if (!(value[0] instanceof IntegerType))
        throw new TypeError('Invalid value for SpecialValueType for ClientpidmapProperty. The first item in the array should be of type IntegerType');

        else if (0 > Number(value[0].repr()))
        throw new InvalidArgument('Invalid value for SpecialValueType for ClientpidmapProperty. The first item in the array should be a positive integer of type IntegerType')

        else if (!(value[1] instanceof URIType))
        throw new TypeError('Invalid value for SpecialValueType for ClientpidmapProperty. The second item in the array should be of type URIType');

        break;
      default:
        throw new InvalidArgument('Invalid target property for SpecialValueType');
    }
  }

  constructor(value, targetProp) {
    super();

    this.#validate(value, targetProp);
    this.targetProp = targetProp;

    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++)
      if (value[index])
      value[index] = value[index].repr();

      this.value = value.join(';');
    }
    else this.value = value;

    this.type = 'TEXT';

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

module.exports = {
  TextType,
  TextListType,
  BooleanType,
  DateTimeType,
  DateTimeListType,
  IntegerType,
  IntegerListType,
  FloatType,
  FloatListType,
  LanguageTagType,
  URIType,
  SexType,
  SpecialValueType
};
