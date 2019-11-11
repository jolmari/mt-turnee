export class ApiCallHelpers {
    public static async FetchGet<T>(url: string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
    }
}
