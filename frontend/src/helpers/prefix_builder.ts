class PrefixBuilder {
  private prefixName: string;
  private allStrings: string[];

  constructor(prefixName: string) {
    this.prefixName = prefixName;
    this.allStrings = [];
  }

  public add(className: string) {
    this.allStrings.push(`${this.prefixName}-${className}`);
    return this;
  }

  public build() {
    return this.allStrings.join(" ");
  }
}

class CreatePrefix {
  public create() {
    return new PrefixBuilder("bp");
  }
}

export const prefix = new CreatePrefix();
export const prefixedNames = (names: string) => {
  const splitString = names.split(" ");
  const createPrefix = prefix.create();

  for (let i = 0; i < splitString.length; i++) {
    createPrefix.add(splitString[i]);
  }

  return createPrefix.build();
};
