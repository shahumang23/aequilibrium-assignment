export interface CastleViewDefinition {
  height: number;
  isPeak?: boolean;
  isValley?: boolean;

  parent?: CastleViewDefinition;
  platformElements?: CastleViewDefinition[];
}

export function parseCastleInputData(data: string): number[] {
  const validInput = isCastleInputDataValid(data);

  return validInput
    ? data.split(',').map(Number)
    : [];
}

export function getNumberOfCastlesForInputData(data: string): number {
  const validInput = isCastleInputDataValid(data);
  const value = validInput
    ? data.split(',').map(Number)
    : [];
  const definitions = createCastles(value);

  return definitions.reduce((total: number, { isValley, isPeak }: CastleViewDefinition) => {
    return total + (isValley || isPeak ? 1 : 0);
  }, 0);
}

export function createCastles(value: number[]): CastleViewDefinition[] {
  const valid = isCastleInputDataValid(value);

  return valid
    ? createAndClassifyElements(value)
    : [];
}

export function isCastleInputDataValid(data: string | number[]): boolean {
  if (!data) {
    return false;
  }

  const testRegExp = /^([1-9]|10)(,(?=\d)([1-9]|10))+$/gm;
  const input = (typeof data === 'string')
    ? data
    : data.join(',');

  return testRegExp.test(input);
}

function createAndClassifyElements(value: number[]): CastleViewDefinition[] {
  const elements: CastleViewDefinition[] = createAndGroupElements(value);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const previous = i - 1;
    const next = i + 1;

    element.isPeak = isPeak(elements, element, previous, next);
    element.isValley = isValley(elements, element, previous, next);
  }

  return elements;
}

function isPeak(elements: CastleViewDefinition[], { height }: CastleViewDefinition, previous: number, next: number): boolean {
  return !(
    (previous >= 0 && elements[previous].height > height) ||
    (next < elements.length && elements[next].height > height)
  );
}

function isValley(elements: CastleViewDefinition[], { height }: CastleViewDefinition, previous: number, next: number): boolean {
  return !(
    (previous >= 0 && elements[previous].height < height) ||
    (next < elements.length && elements[next].height < height)
  );
}

function createAndGroupElements(value: number[]): CastleViewDefinition[] {
  const result: CastleViewDefinition[] = [];

  for (let i = 0; i < value.length; i++) {
    const height = value[i];
    const platformValues = scanAhead(height, value, i + 1);

    const current: CastleViewDefinition = { height };

    if (platformValues) {
      i += platformValues;

      current.platformElements = Array.from({ length: platformValues }, () => {
        return { height, parent: current };
      });
    }

    result.push(current);
  }

  return result;
}

function scanAhead(checkForHeight: number, value: number[], fromIndex: number): number {
  for (let i = fromIndex; i < value.length; i++) {
    if (value[i] !== checkForHeight) {
      return i - fromIndex;
    }
  }

  return value.length - fromIndex;
}
