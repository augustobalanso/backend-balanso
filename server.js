const app = require('./app')
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
