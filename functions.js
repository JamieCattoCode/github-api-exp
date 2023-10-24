const axios = require('axios');
const babelParser = require('@babel/parser');

exports.accessFileContents = async (githubResponse, fileName) => {
    const fileObj = githubResponse.find((file) => {
        if (file.name === fileName) {
            console.log('File found')
            return true;
        }
    });

    const { download_url } = fileObj;

    const { data } = await axios.get(download_url);

    return data;
}

exports.getRepoContents = async (ghUsername, repoName, path='') => {
    const { data } = await axios.get(`https://api.github.com/repos/${ghUsername}/${repoName}/contents${path}`);
    return data;
}

exports.getRepoInfo = async (ghUsername, repoName) => {
    const { data } = await axios.get(`https://api.github.com/repos/${ghUsername}/${repoName}`);
    return data;
}

exports.parseFile = async (fileString, fileName) => {
    return babelParser.parse(fileString, { sourceType: 'module', sourceFilename: fileName, plugins: ['jsx'] });
}