declare type ParsedVcard = {
  parsedVcard: {
    group: string;
    property: string;
    parameters: Record<string, string | string[]>;
    value: string;
  }[];
  readonly properties: string[];
  readonly propertiesWithoutParameters: string[];
  readonly propertiesWithParameters: string[];
  readonly groups: string[];
  getGroup(group?: string): {
    group: string;
    property: string;
    parameters: Record<string, string | string[]>;
    value: string;
  }|{
    group: string;
    property: string;
    parameters: Record<string, string | string[]>;
    value: string;
  }[];
  readonly repeatingProperties: Record<string, string | string[]>;
}

export function parse(vcard: string): ParsedVcard | ParsedVcard[];
