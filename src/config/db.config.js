export const dbConfig = {

    client: 'sqlite3',
    connection: () => ({
      filename: process.env.SQLITE_FILENAME
    }),
    postProcessResponse: (result, _queryContext) => {
        if (Array.isArray(result)) {
            return result.map(row => {
                return JSON.parse(JSON.stringify(row));
            })
        }
        return JSON.parse(JSON.stringify(result));
    }
}

