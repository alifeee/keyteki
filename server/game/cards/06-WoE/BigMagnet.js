const Card = require('../../Card.js');

class BigMagnet extends Card {
    // Play: Choose a friendly creature. Take control of each upgrade in play and move it to that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                cardType: 'creature',
                gameAction: ability.actions.attach((context) => ({
                    target: context.target,
                    upgrade: context.game.creaturesInPlay
                        .filter((card) => card !== context.target && card.upgrades.length > 0)
                        .flatMap((card) => card.upgrades || [])
                }))
            },
            effect: 'take control of each upgrade in play and move it to {0}'
        });
    }
}

BigMagnet.id = 'big-magnet';

module.exports = BigMagnet;
