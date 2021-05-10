export enum Language {
  German = 'de',
  English = 'en',
}

export function languageToString(language: Language): string {
  switch (language) {
    case Language.English:
      return 'en';

    case Language.German:
      return 'de';
  }
}
