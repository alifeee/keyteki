const Card = require('../../Card.js');

class EtherSpider extends Card {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onModifyAmber: (event, context) =>
                    event.player === context.player.opponent && !event.loseAmber
            },
            gameAction: ability.actions.sequential([
                ability.actions.placeAmber((context) => ({
                    target: context.source,
                    amount: context.event.amount
                })),
                ability.actions.changeEvent((context) => ({
                    event: context.event,
                    amount: 0
                }))
            ])
        });

        this.persistentEffect({
            effect: ability.effects.cardCannot('dealFightDamage')
        });
    }
}

EtherSpider.id = 'ether-spider';

module.exports = EtherSpider;
