import { rootLogger } from '@hyperlane-xyz/utils';
export function isCompliant(schema) {
    return (config) => schema.safeParse(config).success;
}
export function validateZodResult(result, desc = 'config') {
    if (!result.success) {
        rootLogger.warn(`Invalid ${desc}`, result.error);
        throw new Error(`Invalid desc: ${result.error.toString()}`);
    }
    else {
        return result.data;
    }
}
//# sourceMappingURL=schemas.js.map