describe('Lightbringer Outpost', function () {
    describe("Lightbringer Outpost's effect", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'sanctum',
                    amber: 2,
                    inPlay: ['chelonia', 'flaxia', 'lightbringer-outpost'],
                    hand: ['troll'],
                    deck: ['krump', 'alaka']
                },
                player2: {
                    amber: 5,
                    inPlay: ['urchin', 'valoocanth', 'floomf']
                }
            });
        });

        it('should offer friendly creatures as selections for use', function () {
            this.player1.useAction(this.lightbringerOutpost);

            expect(this.player1).toBeAbleToSelect(this.chelonia);
            expect(this.player1).toBeAbleToSelect(this.flaxia);
            expect(this.player1).not.toBeAbleToSelect(this.urchin);
        });

        it('should put a creature on the bottom of the deck', function () {
            this.player1.useAction(this.lightbringerOutpost);
            this.player1.clickCard(this.chelonia);

            expect(this.player1.player.deck[this.player1.player.deck.length - 1]).toBe(
                this.chelonia
            );
        });
    });
});
