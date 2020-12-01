import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";
import { FakePeopleOptions } from "./src/core/models.ts";
import { Document } from "./src/core/models.ts";
import { Person } from "./src/core/models.ts";
import { Name } from "./src/core/models.ts";
import Generator from "./src/core/generator.ts";

export default class Fakep extends Generator {
  constructor(data?: Partial<Omit<Document, "bloodtype">>) {
    super(data);
  }

  /**
   * Generate fake person.
   * @param options
   */
  public generatePerson(options: Omit<FakePeopleOptions, "length">): Person {
    let generated: Person = {};

    // generate birthdate
    if (options.fields.includes("birthdate"))
      generated.birthdate = this.date(
        options.birthdateStartAt,
        options.birthdateEndAt
      );

    // generate dni
    if (options.fields.includes("dni"))
      generated.dni = this.dni(options.dniFormat);

    // generate first name
    const result: Name = this.firstName(options.gender);
    if (options.fields.includes("firstName")) {
      generated.gender = result.gender;
      generated.firstName = result.firstName;
    }

    // generate last name
    if (options.fields.includes("lastName"))
      generated.lastName = this.lastName();

    // generate profession
    if (options.fields.includes("profession"))
      generated.profession = this.profession(generated.gender);

    // generate university
    if (options.fields.includes("university"))
      generated.university = this.university();

    // generate mobile number
    if (options.fields.includes("mobile"))
      generated.mobile = this.phoneNumber("mobile", options.phoneNumberFormat);

    // generate mobile number
    if (options.fields.includes("telephone"))
      generated.telephone = this.phoneNumber(
        "telephone",
        options.phoneNumberFormat
      );

    // generate blood type
    if (options.fields.includes("bloodtype"))
      generated.bloodtype = this.bloodType();

    // generate civil status
    if (options.fields.includes("civilstatus"))
      generated.civilstatus = this.civilStatus(
        generated.birthdate || new Date(),
        generated.gender
      );

    // generate email
    if (options.fields.includes("email")) {
      let fullName: string = generated.firstName ? generated.firstName : "";
      fullName += generated.firstName && generated.lastName ? " " : "";
      fullName += generated.lastName ? generated.lastName : "";

      generated.email = this.email({
        domain: options.domain,
        birthdate: generated.birthdate,
        fullName,
      });
    }

    return generated;
  }

  /**
   * Generate fake people.
   * @param options
   */
  public generatePeople(options: FakePeopleOptions): Array<Person> {
    let generated: Array<Person> = [];
    for (let i = 0; i < options.length; i++) {
      generated.push(this.generatePerson(options));
    }
    return generated;
  }

  /**
   * Export data to a JSON file.
   * @param path
   * @param document
   */
  public exportJSON(path: string, document: object) {
    writeJson(path, document, { spaces: 2 });
  }
}
