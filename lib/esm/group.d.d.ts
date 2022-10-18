import { SourceProperty } from './properties/SourceProperty.d.js';
import { KindProperty } from './properties/KindProperty.d.js';
import { XMLProperty } from './properties/XMLProperty.d.js';
import { FNProperty } from './properties/FNProperty.d.js';
import { NProperty } from './properties/NProperty.d.js';
import { NicknameProperty } from './properties/NicknameProperty.d.js';
import { PhotoProperty } from './properties/PhotoProperty.d.js';
import { BdayProperty } from './properties/BdayProperty.d.js';
import { AnniversaryProperty } from './properties/AnniversaryProperty.d.js';
import { GenderProperty } from './properties/GenderProperty.d.js';
import { BirthPlaceProperty } from './properties/BirthPlaceProperty.d.js';
import { DeathPlaceProperty } from './properties/DeathPlaceProperty.d.js';
import { DeathDateProperty } from './properties/DeathDateProperty.d.js';
import { ExpertiseProperty } from './properties/ExpertiseProperty.d.js';
import { HobbyProperty } from './properties/HobbyProperty.d.js';
import { InterestProperty } from './properties/InterestProperty.d.js';
import { AdrProperty } from './properties/AdrProperty.d.js';
import { TelProperty } from './properties/TelProperty.d.js';
import { EmailProperty } from './properties/EmailProperty.d.js';
import { IMPPProperty } from './properties/IMPPProperty.d.js';
import { LangProperty } from './properties/LangProperty.d.js';
import { ContactURIProperty } from './properties/ContactURIProperty.d.js';
import { TzProperty } from './properties/TzProperty.d.js';
import { GeoProperty } from './properties/GeoProperty.d.js';
import { TitleProperty } from './properties/TitleProperty.d.js';
import { RoleProperty } from './properties/RoleProperty.d.js';
import { LogoProperty } from './properties/LogoProperty.d.js';
import { OrgProperty } from './properties/OrgProperty.d.js';
import { MemberProperty } from './properties/MemberProperty.d.js';
import { RelatedProperty } from './properties/RelatedProperty.d.js';
import { OrgDirectoryProperty } from './properties/OrgDirectoryProperty.d.js';
import { CategoriesProperty } from './properties/CategoriesProperty.d.js';
import { NoteProperty } from './properties/NoteProperty.d.js';
import { ProdidProperty } from './properties/ProdidProperty.d.js';
import { RevProperty } from './properties/RevProperty.d.js';
import { SoundProperty } from './properties/SoundProperty.d.js';
import { UIDProperty } from './properties/UIDProperty.d.js';
import { ClientpidmapProperty } from './properties/ClientpidmapProperty.d.js';
import { URLProperty } from './properties/URLProperty.d.js';
import { KeyProperty } from './properties/KeyProperty.d.js';
import { FburlProperty } from './properties/FburlProperty.d.js';
import { CaladruriProperty } from './properties/CaladruriProperty.d.js';
import { CaluriProperty } from './properties/CaluriProperty.d.js';
import { ExtendedProperty } from './properties/ExtendedProperty.d.js';

declare class Group {
  repr(): string;
  reprXML(): string;
  reprJSON(): {}[];
  hasMemberProperty: boolean;
  kindPropertyIsGroup: boolean;
  get propertyInstanceCount(): Map<string, number>;
  constructor(
    props: (
      | SourceProperty
      | KindProperty
      | XMLProperty
      | FNProperty
      | NProperty
      | NicknameProperty
      | PhotoProperty
      | BdayProperty
      | AnniversaryProperty
      | GenderProperty
      | BirthPlaceProperty
      | DeathPlaceProperty
      | DeathDateProperty
      | ExpertiseProperty
      | HobbyProperty
      | InterestProperty
      | AdrProperty
      | TelProperty
      | EmailProperty
      | IMPPProperty
      | LangProperty
      | ContactURIProperty
      | TzProperty
      | GeoProperty
      | TitleProperty
      | RoleProperty
      | LogoProperty
      | OrgProperty
      | MemberProperty
      | RelatedProperty
      | OrgDirectoryProperty
      | CategoriesProperty
      | NoteProperty
      | ProdidProperty
      | RevProperty
      | SoundProperty
      | UIDProperty
      | ClientpidmapProperty
      | URLProperty
      | KeyProperty
      | FburlProperty
      | CaladruriProperty
      | CaluriProperty
      | ExtendedProperty
    )[],
    groupName: string
  );
}

export { Group };
