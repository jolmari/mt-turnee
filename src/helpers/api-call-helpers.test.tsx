import { ApiCallHelpers } from './api-call-helpers';

describe('ApiCallHelpers', () => {
    it('FetchGet() should return json() result on success response.', async () => {
        // Arrange
        const mockResponse: Response = new Response();
        Object.assign(mockResponse, {
            json: () => ({
                data: 'foo',
            }),
            ok: true,
        });
        const mockJsonPromise = Promise.resolve(mockResponse);

        jest.spyOn(window, 'fetch').mockImplementation((input, init) =>
            Promise.resolve(mockJsonPromise)
        );

        // Act & Assert
        await expect(ApiCallHelpers.FetchGet<any>('url')).resolves.toEqual({
            data: 'foo',
        });
    });

    it('FetchGet() should handle promise rejection and throw error.', async () => {
        // Arrange
        const mockResponse: Response = new Response();
        Object.assign(mockResponse, {
            ok: false,
            status: 401,
            statusText: 'Forbidden',
        });
        const mockJsonPromise = Promise.resolve(mockResponse);

        jest.spyOn(window, 'fetch').mockImplementation((input, init) =>
            Promise.resolve(mockJsonPromise)
        );

        // Act & Assert
        await expect(ApiCallHelpers.FetchGet<any>('url')).rejects.toThrowError(
            '401: Forbidden'
        );
    });
});
