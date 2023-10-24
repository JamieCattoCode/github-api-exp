const { getRepoContents } = require("../functions");

class RepoFileSystemEntry {
    constructor(
        {name,
        repoId,
        url,
        fullPath}
    ) {
        this.name = name;
        this.fullPath = fullPath;
        this.repoId = repoId;
        this.url = url;
    }

    getHasChildren (filePath) {
        // Make an API call to that exact directory
    }
}

module.exports = class RepoDirectory extends RepoFileSystemEntry {
    constructor({name, repoId, url, fullPath}) {
        super({name, repoId, url, fullPath});
        this.contents = [];
    }
}

module.exports = class RepoFile extends RepoFileSystemEntry {
    constructor({ name, repoId, url, fullPath }) {
        super({ name, repoId, url, fullPath });
        this.fullPath = fullPath;
        this.fileContent = "";
    }

    async initFileContent () {
        const { content: base64Content } = await getRepoContents(this.repoId.userName, this.repoId.repositoryName, this.fullPath);
        this.fileContent = Buffer.from(base64Content, 'base64').toString('utf-8');
        return this.fileContent;
    }

    async getFileContent () {
        return this.fileContent;
    }
}