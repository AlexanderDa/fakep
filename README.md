# fakep

Generate fake people record.

## Table of Contents

- [fakep](#fakep)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Basic Usage](#basic-usage)
  - [Options](#options)
    - [General Options](#general-options)
    - [Global Options](#global-options)
  - [License](#license)

## Description

`fakep` is a Deno module that allows you to create a fake people record.

## Basic Usage

It's very easy to get started. Just create an `Fakep` instance and use the `generatePeople()` method to generate a record.

```ts
import Fakep from "https://raw.githubusercontent.com/AlexanderDa/fakep/main/mod.ts";

const fakep = new Fakep();

const people = fakep.generatePeople({
  fields: ["firstName", "lastName"],
  length: 1
});

console.log(people); // [ { gender: "F", firstName: "Irene Dora", lastName: "Escobar Chávez" } ]
```

You can also just generate a single person:

```ts
const person = fakep.generatePerson({
  fields: ["firstName", "lastName"]
});

console.log(person); // { gender: "F", firstName: "Catuxa Taliaa", lastName: "Ávila Agüero" }
```

## Options

`fakep` has options that you can pass to generate record.

### General Options

These options are available for all generation methods.

- `fields` **(Array<string>, required)** - List of fields  to generate.
- `gender` **(string)** - Gender of the name, by default male and female names are generated.
- `domain` **(string)** - Email domain, emails will be generated only with that domain.
- `birthdateStartAt` **(Date)** - Start date to generate the birthdate, by default it starts at `1950-01-01`.
- `birthdateEndAt` **(Date)** - End date to generate the birthdate, by default it ends at `current date`.
- `dniFormat` **(boolean)** - Allow formatting  dni  generated from `0123456789` to `012345678-9`.
- `phoneNumberFormat` **(boolean)** - Allow formatting  phone number  generated from `0912345678` to `091 234 5678` or `(032) 123 456`.

  

### Global Options

These options will apply only on the method `generatePeople`:

- `length` **(number)** - Number of people in the record.



## License

MIT.
