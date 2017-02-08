
import { Achievement, AchievementTypes } from '../achievement';

export class Effective extends Achievement {
  static achievementData(player) {

    const value = player.$statistics.countChild('Combat.Give.Effect');
    const baseValue = 200;

    let tier = 1;
    while(value >= baseValue * Math.pow(2, tier-1)) {
      tier++;
    }

    tier--;

    if(tier === 0) return [];

    const rewards = [{
      type: 'stats',
      mp: (player, baseValue) => baseValue * 0.01 * tier,
      mpDisplay: `+${tier}% MP`
    }];

    if(tier >= 5) {
      rewards.push({ type: 'title', title: 'Effective', deathMessage: '%player effectively got written out of a will by dying.' });
    }

    if(tier >= 6) {
      rewards.push({ type: 'petattr', petattr: 'a warped painting of the Mona Liza' });
    }

    return [{
      tier,
      name: 'Effective',
      desc: `Gain +${tier}% MP for ${(baseValue*Math.pow(2, tier-1)).toLocaleString()} combat effect usages.`,
      type: AchievementTypes.COMBAT,
      rewards
    }];
  }
}
