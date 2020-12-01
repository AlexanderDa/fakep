import { removeAccents } from "./utils.ts";
import { randomString } from "./utils.ts";
import { Document } from "./models.ts";
import { calcAge } from "./utils.ts";
import { Name } from "./models.ts";
import Data from "../data.ts";

export default abstract class Generator {
  private data = Data;

  constructor(data?: Partial<Omit<Document, "bloodtype">>) {
    this.data.domains = data?.domains || Data.domains;
    this.data.femaleNames = data?.femaleNames || Data.femaleNames;
    this.data.lastNames = data?.lastNames || Data.lastNames;
    this.data.maleNames = data?.maleNames || Data.maleNames;
    this.data.professions = data?.professions || Data.professions;
    this.data.universities = data?.universities || Data.universities;
  }

  /**
   * Generate random first name.
   * @param gender gender of the name
   * @returns random first name
   */
  protected firstName(gender?: "F" | "M"): Name {
    let result: Name = {};

    switch (gender) {
      // generate a female name.
      case "F":
        result.gender = "F";
        result.firstName = `${
          this.data.femaleNames[
            Math.floor(Math.random() * this.data.femaleNames.length)
          ]
        } ${
          this.data.femaleNames[
            Math.floor(Math.random() * this.data.femaleNames.length)
          ]
        }`;
        break;

      // generate a male name.
      case "M":
        result.gender = "M";
        result.firstName = `${
          this.data.maleNames[
            Math.floor(Math.random() * this.data.maleNames.length)
          ]
        } ${
          this.data.maleNames[
            Math.floor(Math.random() * this.data.maleNames.length)
          ]
        }`;
        break;
      // generate a random name.
      default:
        const opt: Array<"F" | "M"> = ["F", "M"];
        const selected: "F" | "M" = opt[Math.floor(Math.random() * opt.length)];
        switch (selected) {
          case "F":
            result.gender = "F";
            result.firstName = `${
              this.data.femaleNames[
                Math.floor(Math.random() * this.data.femaleNames.length)
              ]
            } ${
              this.data.femaleNames[
                Math.floor(Math.random() * this.data.femaleNames.length)
              ]
            }`;
            break;

          default:
            result.gender = "M";
            result.firstName = `${
              this.data.maleNames[
                Math.floor(Math.random() * this.data.maleNames.length)
              ]
            } ${
              this.data.maleNames[
                Math.floor(Math.random() * this.data.maleNames.length)
              ]
            }`;
            break;
        }
        break;
    }

    return result;
  }

  /**
   * Generate random last name.
   * @returns random last name
   */
  protected lastName(): string {
    return `${
      this.data.lastNames[
        Math.floor(Math.random() * this.data.lastNames.length)
      ]
    } ${
      this.data.lastNames[
        Math.floor(Math.random() * this.data.lastNames.length)
      ]
    }`;
  }

  /**
   * Generate random profession.
   * @param gender
   * @returns random profession
   */
  protected profession(gender?: "F" | "M"): string {
    let result: string = this.data.professions[
      Math.floor(Math.random() * this.data.professions.length)
    ];

    if (gender) {
      if (gender === "F") result = result.replace("@", "a").replace("/a", "a");
      if (gender === "M") result = result.replace("@", "o").replace("/a", "");
    }

    return result;
  }

  /**
   * Generate random university.
   * @returns random university
   */
  protected university(): string {
    return this.data.universities[
      Math.floor(Math.random() * this.data.universities.length)
    ];
  }

  /**
   * Generate random blood type.
   * @returns random blood type
   */
  protected bloodType(): string {
    return this.data.bloodtype[
      Math.floor(Math.random() * this.data.bloodtype.length)
    ];
  }

  /**
   * Generate random civil status.
   * @param gender
   * @returns random civil status
   */
  protected civilStatus(birthdate: Date, gender?: "F" | "M"): string {
    let result: string = this.data.civilStatus[
      Math.floor(Math.random() * this.data.civilStatus.length)
    ];

    if (calcAge(birthdate) < 18) {
      result = "Solter@";
    }

    if (gender) {
      if (gender === "F") result = result.replace("@", "a");
      if (gender === "M") result = result.replace("@", "o");
    }

    return result;
  }

  /**
   * Generate random date.
   * @param startAt default is *1950-01-01*
   * @param endAt default is current date
   * @returns date generated
   */
  protected date(startAt?: Date, endAt?: Date): Date {
    endAt = endAt || new Date();
    startAt = startAt || new Date("1950-01-01");

    return new Date(
      startAt.getTime() + Math.random() * (endAt.getTime() - startAt.getTime())
    );
  }

  /**
   * Generate random dni.
   * @param format phone number format
   * @returns dni generated
   */
  protected dni(format?: boolean): string {
    let result = "0" + randomString("number", 9);

    if (format === true) {
      const match = result.match(/^(\d{9})(\d{1})$/);
      if (match) result = `${match[1]}-${match[2]}`;
    }

    return result;
  }

  /**
   * Generate random email.
   * @param config
   * @returns email generated
   */
  protected email(config?: {
    domain?: string;
    fullName?: string;
    birthdate?: Date;
  }): string {
    // set domain
    const domain: string =
      config?.domain ||
      this.data.domains[Math.floor(Math.random() * this.data.domains.length)];

    // init keys
    let keys: Array<string> = ["_", "-", "."];

    //set names
    const names: Array<string> = config?.fullName
      ? config.fullName.split(" ")
      : `${this.lastName()} ${this.firstName().firstName}`.split(" ");

    // set names and its initials
    names.forEach((value) => {
      keys.push(value);
      keys.push(value.charAt(0));
    });

    // set birthdate
    const birthdate = config?.birthdate || this.date();

    birthdate
      .toISOString()
      .substr(0, 10)
      .split("-")
      .forEach((value) => {
        keys.push(value);
      });

    // generate an user
    let user: string = "";
    for (let i = 0; i < 4; i++) {
      const index: number = Math.floor(Math.random() * keys.length);
      user += `${keys[index]}`;
      keys.splice(index, 1);
    }

    return removeAccents(`${user}@${domain}`).toLowerCase();
  }

  /**
   * Generate random phone number.
   * @param type type of phone number
   * @param format phone number format
   * @returns phone number generated
   */
  protected phoneNumber(
    type: "mobile" | "telephone",
    format?: boolean
  ): string {
    let result = `${type === "mobile" ? "09" : "0"}`;
    result += randomString("number", 8);

    if (format === true)
      if (type === "mobile") {
        const match = result.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          result = `${match[1]} ${match[2]} ${match[3]}`;
        }
      } else {
        const match = result.match(/^(\d{3})(\d{3})(\d{3})$/);
        if (match) {
          result = `(${match[1]}) ${match[2]} ${match[3]}`;
        }
      }

    return result;
  }
}
