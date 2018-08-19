const CardGameAction = require('./CardGameAction');

class ResolveFightAction extends CardGameAction {
    setDefaultProperties () {
        this.attacker = null;
    }

    setup() {
        this.name = 'attack';
        this.targetType = ['creature'];
        this.effectMsg = 'make {1} fight {0}';
        this.effectArgs = this.attacker;
    }

    canAffect(card, context) {
        if(card.location !== 'play area' || !this.attacker) {
            return false;
        } else if(!this.attacker.checkRestrictions('fight') || card.controller === this.attacker.controller) {
            return false;
        }
        return super.canAffect(card, context);
    }

    getEvent(card, context) {
        let params = {
            card: card,
            context: context,
            attacker: this.attacker,
            attackerTarget: card,
            defenderTarget: this.attacker,
            destroyed: []
        };
        return super.createEvent('onFight', params, event => {
            if(!event.card.getKeywordValue('elusive') || event.card.elusiveUsed) {
                let damageEvents = [];
                if((!event.attacker.getKeywordValue('skirmish') || event.defenderTarget !== event.attacker) && event.card.checkRestrictions('dealFightDamage')) {
                    let defenderParams = {
                        amount: event.card.power,
                        fightEvent: event,
                        damageSource: event.card
                    };
                    damageEvents.push(context.game.actions.dealDamage(defenderParams).getEvent(event.defenderTarget, context));
                }
                if(event.attacker.checkRestrictions('dealFightDamage')) {
                    let attackerParams = {
                        amount: event.attacker.power,
                        fightEvent: event,
                        damageSource: event.attacker
                    };
                    damageEvents.push(context.game.actions.dealDamage(attackerParams).getEvent(event.attackerTarget, context));
                }
                context.game.openEventWindow(damageEvents);
            }
            event.card.elusiveUsed = true;
        });
    }
}

module.exports = ResolveFightAction;
