const GameAction = require('./GameAction');

class SequentialAction extends GameAction {
    constructor(gameActions) {
        super({ gameActions: gameActions });
        this.gameActions = gameActions;
    }

    setup() {
        super.setup();
        this.effectMsg = 'do several things';
    }

    update(context) {
        for(let gameAction of this.gameActions) {
            gameAction.update(context);
        }
    }

    setDefaultTarget(func) {
        for(let gameAction of this.gameActions) {
            gameAction.setDefaultTarget(func);
        }
    }

    setTarget(target) {
        for(let gameAction of this.gameActions) {
            gameAction.setTarget(target);
        }
    }

    preEventHandler(context) {
        for(let gameAction of this.gameActions) {
            gameAction.preEventHandler(context);
        }
    }

    hasLegalTarget(context) {
        return this.gameActions.some(gameAction => gameAction.hasLegalTarget(context));
    }

    canAffect(target, context) {
        return this.gameActions.some(gameAction => gameAction.canAffect(target, context));
    }

    getEventArray(context) {
        return [super.createEvent('unnamedEvent', {}, () => {
            for(let action of this.gameActions) {
                context.game.queueSimpleStep(() => context.game.openEventWindow(action.getEventArray(context)));
            }
        })];
    }
}

module.exports = SequentialAction;
