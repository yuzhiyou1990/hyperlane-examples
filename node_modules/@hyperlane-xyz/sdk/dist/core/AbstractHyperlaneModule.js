export class HyperlaneModule {
    args;
    constructor(args) {
        this.args = args;
    }
    serialize() {
        return this.args.addresses;
    }
}
//# sourceMappingURL=AbstractHyperlaneModule.js.map