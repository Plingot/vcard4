import { BaseProperty } from './BaseProperty.js';
import { MissingArgument, InvalidArgument } from '../errors/index.js';

export class URLProperty extends BaseProperty {
  static identifier = 'URLProperty';
  static prop = 'URL';
  static cardinality = '*';
  static acceptableParamTypes = new Set([
    'ValueParameter',
    'PIDParameter',
    'PrefParameter',
    'IndexParameter',
    'TypeParameter',
    'MediatypeParameter',
    'AltidParameter',
    'AnyParameter'
  ]);
  static acceptableValTypes = 'URIType';

  #validate(params, value) {
    if (typeof params === 'undefined' || typeof value === 'undefined')
    throw new MissingArgument('Parameters and value for URLProperty must be supplied');

    else if (!Array.isArray(params))
    throw new InvalidArgument('Parameters for URLProperty must be passed in an array');

    else if (
      !params.every(param => {
        if (param.constructor.identifier === 'TypeParameter')
        return !/^(?:Related|Tel)Property$/i.test(param.targetProp);

        else if (param.constructor.identifier === 'ValueParameter')
        return param.value === 'uri';

        return this.constructor.acceptableParamTypes.has(param.constructor.identifier);
      })
    )
    throw new TypeError('Some of the parameters passed are not valid parameters for URLProperty');

    else if (value.constructor.identifier !== this.constructor.acceptableValTypes)
    throw new TypeError('Invalid type for value of URLProperty');
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

Object.freeze(URLProperty);
