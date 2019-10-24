export function FetchGet<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response;
            }

            throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then(response => response.json());
}
