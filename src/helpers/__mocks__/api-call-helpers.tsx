export class ApiCallHelpers {
    public static   FetchGet(url: string): Promise<any> {
        // tslint:disable-next-line: no-object-literal-type-assertion
        return Promise.resolve({
            body: {
                results: {
                    items: [
                        {
                            category: {
                                id: 'airport',
                            },
                        },
                        {
                            category: {
                                id: 'restaurant',
                            },
                        },
                        {
                            category: {
                                id: 'church',
                            },
                        },
                        {
                            category: {
                                id: 'restaurant',
                            },
                        },
                    ],
                },
            },
        });
    }
}
