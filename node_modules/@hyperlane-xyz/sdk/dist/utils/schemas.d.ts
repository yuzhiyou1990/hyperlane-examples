import { SafeParseReturnType, z } from 'zod';
export declare function isCompliant<S extends Zod.Schema>(schema: S): (config: unknown) => config is z.TypeOf<S>;
export declare function validateZodResult<T>(result: SafeParseReturnType<T, T>, desc?: string): T;
//# sourceMappingURL=schemas.d.ts.map