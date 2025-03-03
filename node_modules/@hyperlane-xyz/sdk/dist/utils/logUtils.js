export function findMatchingLogEvents(logs, iface, eventName) {
    return logs
        .map((log) => {
        try {
            return iface.parseLog(log);
        }
        catch {
            return undefined;
        }
    })
        .filter((log) => !!log && log.name === eventName);
}
//# sourceMappingURL=logUtils.js.map