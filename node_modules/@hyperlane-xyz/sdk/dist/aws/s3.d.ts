export declare const S3_BUCKET_REGEX: RegExp;
export interface S3Receipt<T = unknown> {
    data: T;
    modified: Date;
}
export interface S3Config {
    bucket: string;
    region: string;
    folder?: string;
    caching?: boolean;
}
export declare class S3Wrapper {
    readonly config: S3Config;
    private readonly client;
    private cache;
    static fromBucketUrl(bucketUrl: string): S3Wrapper;
    constructor(config: S3Config);
    formatKey(key: string): string;
    getS3Obj<T>(key: string): Promise<S3Receipt<T> | undefined>;
    url(key: string): string;
}
//# sourceMappingURL=s3.d.ts.map