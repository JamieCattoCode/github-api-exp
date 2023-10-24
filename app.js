const express = require('express');
const axios = require('axios');
const { accessFileContents, parseFile, getRepoContents, getRepoInfo } = require('./functions');
const GithubRepository = require('./objects/Repository');

const port = 3000;

express.json();

const app = express();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get('/', async (req, res) => {
    const data = await getRepoInfo('JamieCattoCode', 'react-portfolio');

    console.log(data.id);

    const repo = new GithubRepository(data.id, data.name, data.owner.login);

    // get all the files from the repo
    // have a method on the repository which is like initialise structure
    const files = await repo.initStructure();
    const packageJson = files.find((file) => file.name === 'package.json');

    console.log(packageJson);
    return res.json(files);
});
