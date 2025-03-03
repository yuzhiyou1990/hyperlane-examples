import { ethers } from 'ethers';
import { Log } from 'viem';
export declare function findMatchingLogEvents(logs: (ethers.providers.Log | Log<bigint, number, false>)[], iface: ethers.utils.Interface, eventName: string): ethers.utils.LogDescription[];
//# sourceMappingURL=logUtils.d.ts.map