import {
  SpecialValueType,
  SexType,
  TextType,
  DateTimeType,
} from "../../src/values/index.js";
import { GenderProperty } from "../../src/properties/index.js";
import { assert } from "chai";

describe("GenderProperty tests", () => {
  it("Accepts valid input", () => {
    assert.doesNotThrow(
      () =>
        new GenderProperty(
          [],
          new SpecialValueType(
            [new SexType("O"), new TextType("intersex")],
            "genderproperty"
          )
        )
    );
  });

  it("Rejects invalid input", () => {
    assert.throws(
      () => new GenderProperty([], new DateTimeType("19960415", "date"))
    );
    assert.throws(() => new GenderProperty(1));
    assert.throws(() => new GenderProperty({}));
    assert.throws(() => new GenderProperty("James Bond"));
  });

  it("Formats value properly", () => {
    assert.strictEqual(
      new GenderProperty(
        [],
        new SpecialValueType(
          [new SexType("O"), new TextType("intersex")],
          "genderproperty"
        )
      ).repr(),
      "GENDER:O;intersex"
    );
    assert.strictEqual(
      new GenderProperty(
        [],
        new SpecialValueType(
          [new SexType("O"), new TextType("intersex")],
          "genderproperty"
        )
      ).reprXML(),
      "<gender><sex>O</sex><text>intersex</text></gender>"
    );
    assert.deepEqual(
      new GenderProperty(
        [],
        new SpecialValueType(
          [new SexType("O"), new TextType("intersex")],
          "genderproperty"
        )
      ).reprJSON(),
      ["gender", {}, "text", ["O", "intersex"]]
    );
  });
});
