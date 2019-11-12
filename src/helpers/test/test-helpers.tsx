export class TestHelpers {
    /**
     * @description Used to force the completion of all currently pending promises.
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
     */
    public static flushPromises(): Promise<any> {
        return new Promise(resolve => setImmediate(resolve));
    }
}
