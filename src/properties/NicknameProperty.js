import { BaseProperty } from './BaseProperty.js';
import { MissingArgument, InvalidArgument } from '../errors/index.js';

export class NicknameProperty extends BaseProperty {
  static identifier = 'NicknameProperty';
  static prop = 'NICKNAME';
  static cardinality = '*';
  static acceptableParamTypes = new Set([
    'ValueParameter',
    'TypeParameter',
    'LanguageParameter',
    'AltidParameter',
    'PIDParameter',
    'PrefParameter',
    'IndexParameter',
    'AnyParameter'
  ]);
  static acceptableValTypes = new Set([
    'TextType',
    'TextListType'
  ]);

  #validate(params, value) {
    if (typeof params === 'undefined' || typeof value === 'undefined')
    throw new MissingArgument('Parameters and value for NicknameProperty must be supplied');

    else if (!Array.isArray(params))
    throw new InvalidArgument('Parameters for NicknameProperty must be passed in an array');

    else if (
      !params.every(param => {
        if (param.constructor.identifier === 'TypeParameter')
        return !/^(?:Related|Tel)Property$/i.test(param.targetProp);

        else if (param.constructor.identifier === 'ValueParameter')
        return param.value === 'text';

        return this.constructor.acceptableParamTypes.has(param.constructor.identifier);
      })
    )
    throw new TypeError('Some of the parameters passed are not valid parameters for NicknameProperty');

    else if (!this.constructor.acceptableValTypes.has(value.constructor.identifier))
    throw new TypeError('Invalid type for value of NicknameProperty');
  }

  constructor(params, val) {
    super();

    this.#validate(params, val);
    this.params = params.reduce((parametersArray, currentParameter) => {
      parametersArray.push(currentParameter.repr());
      return parametersArray;
    }, []).join(';');
    this.value = val.repr();

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

Object.freeze(NicknameProperty);
