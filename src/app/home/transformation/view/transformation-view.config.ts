import { convertEnumToArray, KeyValuePair } from '../../../core/utils';

export enum TransformerTeam {
  Autobot = 'A',
  Decepticon = 'D'
}

export enum TransformerTeamLabel {
  A = 'Autobots',
  D = 'Decepticons'
}

export enum TransformerStatus {
  Survivor = -1,
  Destroyed,
  Winner,
}

export enum TransformerStatsProperties {
  strength,
  intelligence,
  speed,
  endurance,
  rank,
  courage,
  firepower,
  skill
}

export interface TransformersBattleResults {
  numberOfBattles: number;
  status?: string;
  winningTeam?: TransformersBattleResultsTeam;
  loosingTeam?: TransformersBattleResultsTeam;
}

export interface TransformersBattleResultsTeam {
  team: TransformerTeam;
  members: TransformersViewDefinition[];
}

export interface TransformerStats {
  strength: number;
  intelligence: number;
  speed: number;
  endurance: number;
  rank: number;
  courage: number;
  firepower: number;
  skill: number;
}

export interface TransformersViewDefinition {
  name: string;
  team: TransformerTeam;
  rating: number;
  stats: TransformerStats;
  status: TransformerStatus;
}

interface TransformersByTeam {
  [team: string]: TransformersViewDefinition[];
}

export const emptyBattleResults = { numberOfBattles: 0 } as TransformersBattleResults;

const specialMembers = ['optimus prime', 'predaking'];

export function isTransformersInputValid(data: string): boolean {
  if (!data) {
    return false;
  }

  return data
    .split('\n')
    .filter(Boolean)
    .map(line => isTransformerDefinitionValid(line))
    .every(Boolean);
}

export function createTransformers(data: string): TransformersByTeam {
  const transformers: TransformersViewDefinition[] = createTransformersFromInputData(data);
  const transformersByTeam = transformers.reduce((teams: TransformersByTeam, transformer: TransformersViewDefinition) => {
    const { team } = transformer;

    teams[team] = [...(teams[team] || []), ...[transformer]];

    return teams;
  }, {} as TransformersByTeam);
  const rank = 'rank';

  transformersByTeam[TransformerTeam.Autobot] = (transformersByTeam[TransformerTeam.Autobot] || [])
    .sort((a, b) => b.stats[rank] - a.stats[rank]);

  transformersByTeam[TransformerTeam.Decepticon] = (transformersByTeam[TransformerTeam.Decepticon] || [])
    .sort((a, b) => b.stats[rank] - a.stats[rank]);

  return transformersByTeam;
}

export function getBattleResults(autobots: TransformersViewDefinition[], decepticons: TransformersViewDefinition[]): TransformersBattleResults {
  const maxBattles = Math.max(autobots.length, decepticons.length);
  const results = initializeResults();

  if (!maxBattles) {
    return results;
  }

  for (let i = 0; i < maxBattles; i++) {
    const bot1 = i < autobots.length ? autobots[i] : undefined;
    const bot2 = i < decepticons.length ? decepticons[i] : undefined;

    if (isGrandBattle(bot1, bot2)) {
      results.numberOfBattles++;
      results.status = '(All competitors destroyed No Survivors)';

      autobots.forEach(bot => bot.status = TransformerStatus.Destroyed);
      decepticons.forEach(bot => bot.status = TransformerStatus.Destroyed);

      break;
    }

    performBattle(bot1, bot2, results);
  }

  determineBattleResults(autobots, decepticons, results);

  return results;
}

function determineBattleResults(autobots: TransformersViewDefinition[], decepticons: TransformersViewDefinition[], results: TransformersBattleResults): void {
  const autobotsKills = getBotsByStatus(decepticons, TransformerStatus.Destroyed);
  const decepticonsKills = getBotsByStatus(autobots, TransformerStatus.Destroyed);
  const autobotsSurvivors = getBotsByStatus(autobots, TransformerStatus.Survivor);
  const decepticonsSurvivors = getBotsByStatus(decepticons, TransformerStatus.Survivor);

  if (autobotsKills.length === decepticons.length && decepticonsKills.length === autobots.length) {
    results.status = '(All competitors destroyed No Survivors)';

    return;
  }

  if (!autobotsKills.length && !decepticonsKills.length) {
    return;
  }

  if (autobotsKills.length === decepticonsKills.length) {
    const members = autobotsSurvivors.length > decepticonsSurvivors.length
      ? autobotsSurvivors
      : decepticonsSurvivors;

    if (members.length) {
      results.status = `(Undetermined! Survivor via skipped battle [${members[0].name}])`;
    }

    return;
  }

  const winningTeamBots = autobotsKills.length > decepticonsKills.length
    ? getBotsByStatus(autobots, TransformerStatus.Winner)
    : getBotsByStatus(decepticons, TransformerStatus.Winner);
  const winningTeam = winningTeamBots.length ? winningTeamBots[0].team : '';
  const loosingTeam = winningTeam === TransformerTeam.Autobot
    ? TransformerTeam.Decepticon
    : TransformerTeam.Autobot;
  const loosingTeamBots = loosingTeam === TransformerTeam.Autobot
    ? autobotsSurvivors
    : decepticonsSurvivors;

  results.winningTeam = {
    team: winningTeam,
    members: winningTeamBots
  } as TransformersBattleResultsTeam;
  results.loosingTeam = {
    team: loosingTeam,
    members: loosingTeamBots
  } as TransformersBattleResultsTeam;
}

function getBotsByStatus(bots: TransformersViewDefinition[], status: TransformerStatus): TransformersViewDefinition[] {
  return bots.filter(({ status: botStatus }) => botStatus === status);
}

function performBattle(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition, results: TransformersBattleResults): void {
  if (!bot1 || !bot2) {
    return;
  }

  results.numberOfBattles++;
  bot1.status = TransformerStatus.Winner;
  bot2.status = TransformerStatus.Winner;

  if (!isSpecialCondition(bot1, bot2)) {
    if (isStatCondition(bot1, bot2)) {
      return;
    }

    if (isSkillCondition(bot1, bot2)) {
      return;
    }

    checkRatingCondition(bot1, bot2);
  }
}

function isStatCondition(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition): TransformersViewDefinition {
  const botCourage = getBotWithStatDiff(bot1, bot2, 'courage', 4);
  const botStrength = getBotWithStatDiff(bot1, bot2, 'strength', 3);

  const destroyedBot = (botCourage && botStrength && botCourage.name === botStrength.name)
    ? botCourage
    : undefined;

  if (destroyedBot) {
    destroyedBot.status = TransformerStatus.Destroyed;
  }

  return destroyedBot;
}

function isSkillCondition(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition): TransformersViewDefinition {
  const winningBot = getBotWithSkillDiff(bot1, bot2, 'skill', 3);

  if (winningBot) {
    const destroyedBot = [bot1, bot2].find(({ name }) => !compareNames(name, winningBot.name));

    destroyedBot.status = TransformerStatus.Destroyed;
  }

  return winningBot;
}

function checkRatingCondition(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition): void {
  const diff = bot1.rating > bot2.rating
    ? bot1.rating - bot2.rating
    : bot2.rating - bot1.rating;

  if (!diff) {
    bot1.status = bot2.status = TransformerStatus.Destroyed;

    return;
  }

  const destroyedBot = bot1.rating < bot2.rating
    ? bot1
    : bot2.rating < bot1.rating
      ? bot2
      : undefined;

  if (destroyedBot) {
    destroyedBot.status = TransformerStatus.Destroyed;
  }
}

function getBotWithStatDiff(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition, stat: string, statDiff: number): TransformersViewDefinition {
  const diff = getBotStatDiff(bot1, bot2, stat, statDiff);

  if (!diff) {
    return undefined;
  }

  return bot1.stats[stat] < bot2.stats[stat]
    ? bot1
    : bot2.stats[stat] < bot1.stats[stat]
      ? bot2
      : undefined;
}

function getBotWithSkillDiff(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition, stat: string, statDiff: number): TransformersViewDefinition {
  const diff = getBotStatDiff(bot1, bot2, stat, statDiff);

  if (!diff) {
    return undefined;
  }

  return bot1.stats[stat] > bot2.stats[stat]
    ? bot1
    : bot2.stats[stat] > bot1.stats[stat]
      ? bot2
      : undefined;
}

function getBotStatDiff(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition, stat: string, statDiff: number): number {
  const diff = bot1.stats[stat] > bot2.stats[stat]
    ? bot1.stats[stat] - bot2.stats[stat]
    : bot2.stats[stat] - bot1.stats[stat];

  return (!diff || !(diff >= statDiff))
    ? undefined
    : diff;
}

function isSpecialCondition(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition): TransformersViewDefinition {
  const bots = [bot1, bot2];
  const winningBot = bots.find(({ name }) => isSpecialBotName(name));

  if (winningBot) {
    const destroyedBot = bots.find(({ name }) => !compareNames(name, winningBot.name));

    destroyedBot.status = TransformerStatus.Destroyed;
  }

  return winningBot;
}

function isGrandBattle(bot1: TransformersViewDefinition, bot2: TransformersViewDefinition): boolean {
  const names = [bot1?.name || '', bot2?.name || ''];

  return names.every((name) => {
    return !!name
      ? isSpecialBotName(name)
      : false;
  });
}

function isSpecialBotName(name: string): boolean {
  return specialMembers.some(specialName => compareNames(specialName, name));
}

function compareNames(name1: string, name2: string): boolean {
  return name1.toLowerCase().localeCompare(name2.toLowerCase()) === 0;
}

function initializeResults(): TransformersBattleResults {
  return {
    numberOfBattles: 0
  } as TransformersBattleResults;
}

export function checkTransformerTeamsAreValid(autobots: TransformersViewDefinition[], decepticons: TransformersViewDefinition[]): boolean {
  return Boolean(!!autobots.length && !!decepticons.length);
}

export function checkTransformerTeamsDefined(autobots: TransformersViewDefinition[], decepticons: TransformersViewDefinition[]): boolean {
  return Boolean(!!autobots.length || !!decepticons.length);
}

function createTransformersFromInputData(data: string): TransformersViewDefinition[] {
  const validInput = isTransformersInputValid(data);

  return validInput
    ? data
      .split('\n')
      .filter(Boolean)
      .reduce((result: TransformersViewDefinition[], input: string) => {
        const transformer = createTransformer(input);

        return [...result, transformer];
      }, [] as TransformersViewDefinition[])
    : [];
}

function isTransformerDefinitionValid(data: string): boolean {
  const testRegExp = /^([a-zA-Z\s]+\s*)([,]\s*)([DA]{1}\s*)(,([1-9]|10)){8}\s*$/gm;

  return testRegExp.test(data);
}

function createTransformer(input: string): TransformersViewDefinition {
  const properties: string[] = input.split(',').map(item => item.trim());
  const stats: TransformerStats = getTransformerStats(properties);
  const rating = getTransformerRating(stats);

  return {
    name: properties[0],
    team: properties[1] as TransformerTeam,
    rating,
    stats,
    status: TransformerStatus.Survivor
  };
}

function getTransformerStats(properties: string[]): TransformerStats {
  const statProperties = convertEnumToArray(TransformerStatsProperties);
  const statPropertiesIndexOffset = 2;

  return statProperties.reduce((transformerStats: TransformerStats, stat: KeyValuePair) => {
    const statIndex = stat.value + statPropertiesIndexOffset;

    transformerStats[stat.key] = getPropertyValue(properties, statIndex);

    return transformerStats;
  }, {} as TransformerStats);
}

function getPropertyValue(properties: string[], index: number): number {
  const value = Number(properties[index]);

  return isNaN(value) ? 0 : value;
}

function getTransformerRating({ strength, intelligence, speed, endurance, firepower }: TransformerStats): number {
  return strength + intelligence + speed + endurance + firepower;
}
