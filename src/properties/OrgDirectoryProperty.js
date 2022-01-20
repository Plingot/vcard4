import { BaseProperty } from './BaseProperty.js';
import { MissingArgument, InvalidArgument } from '../errors/index.js';

export class OrgDirectoryProperty extends BaseProperty {
  static identifier = 'OrgDirectoryProperty';
  static prop = 'ORG-DIRECTORY';
  static cardinality = '*';
  static acceptableParamTypes = new Set([
    'PrefParameter',
    'IndexParameter',
    'LanguageParameter',
    'PIDParameter',
    'AltidParameter',
    'TypeParameter',
    'AnyParameter'
  ]);
  static acceptableValTypes = 'URIType';

  #params;
  #value;

  get params() {
    return this.#params.reduce((parametersArray, currentParameter) => {
      parametersArray.push(currentParameter.repr());
      return parametersArray;
    }, []).join(';');
  }
  
  get paramsXML() {
    return this.#params.reduce((accumulatedParameters, currentParameter) => accumulatedParameters + currentParameter.reprXML(), '');
  }

  get paramsJSON() {
    return this.#params.reduce(
      (accumulatedParameters, currentParameter) => ({ ...currentParameter.reprJSON(), ...accumulatedParameters }),
      {}
    );
  }

  get value() {
    return this.#value.repr();
  }
  
  get valueXML() {
    return this.#value.reprXML();
  }

  get valueJSON() {
    return this.#value.reprJSON();
  }

  #validate(params, value) {
    if (typeof params === 'undefined' || typeof value === 'undefined')
    throw new MissingArgument('Parameters and value for OrgDirectoryProperty must be supplied');

    else if (!Array.isArray(params))
    throw new InvalidArgument('Parameters for OrgDirectoryProperty must be passed in an array');

    const parameterInstanceCount = new Set();

    if (
      !params.every(param => {
        if (param.constructor.identifier !== 'AnyParameter') {
          if (parameterInstanceCount.has(param.constructor.identifier))
          throw new InvalidArgument('Parameters must not have more than one instance supplied');
          else parameterInstanceCount.add(param.constructor.identifier);
        } else {
          if (parameterInstanceCount.has(param.param))
          throw new InvalidArgument('Parameters must not have more than one instance supplied');
          else parameterInstanceCount.add(param.param);
        }

        if (param.constructor.identifier === 'TypeParameter')
        return !/^(?:Related|Tel)Property$/i.test(param.targetProp);

        return this.constructor.acceptableParamTypes.has(param.constructor.identifier);
      })
    )
    throw new TypeError('Some of the parameters passed are not valid parameters for OrgDirectoryProperty');

    else if (value.constructor.identifier !== this.constructor.acceptableValTypes)
    throw new TypeError('Invalid type for value of OrgDirectoryProperty');
  }

  constructor(params, val) {
    super();

    this.#validate(params, val);
    this.#params = params;
    this.#value = val;

    this.checkAbstractPropertiesAndMethods();
    Object.freeze(this);
  }
}

Object.freeze(OrgDirectoryProperty);
