
/**
 * Generate a random character string
 * @param type output type
 * @param length number of characters
 */
export function randomString(
    type: "string" | "number" | "both",
    length: number
  ): string {
    let characters: string = "0123456789";
  
    if (type === "string") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
  
    if (type === "both") {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      characters += "0123456789";
    }
  
    let random = "";
    for (let i = 0; i < length; i++) {
      random += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return random;
  }
  
  /**
   * Remove accents from a string.
   * @param value String with accents
   * @returns string without accents
   */
  export function removeAccents(value: string): string {
    const accents =
      "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
    const accentsOut =
      "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  
    let result: Array<string> = value.split("");
    let i, x: number;
  
    for (i = 0; i < result.length; i++) {
      if ((x = accents.indexOf(result[i])) != -1) {
        result[i] = accentsOut[x];
      }
    }
    return result.join("");
  }
  
  /**
   * Calculate age from date of birthdate.
   * @param birthdate
   */
  export function calcAge(birthdate: Date): number {
    const birthday = +new Date(birthdate);
    return ~~((Date.now() - birthday) / 31557600000);
  }
  