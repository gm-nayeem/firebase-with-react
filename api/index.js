const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server is running successfull`);
});