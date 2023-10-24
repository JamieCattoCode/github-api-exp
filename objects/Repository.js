const { getRepoContents } = require('../functions');
const RepoFile = require('./FileSystemEntry');
const RepoDirectory = require('./FileSystemEntry');

module.exports = class GithubRepository {
    constructor (
        id,
        name,
        owner
        // structure,
    ) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.user = { userName: owner, repositoryName: this.name };
        this.structure = {};
        this.pathPointer = '/';
        this.files = [];
        this.tree = [];
    }

    async initStructure () {
        // Get all of the contents
        const repoContents = await getRepoContents(this.owner, this.name);
        return this.buildTree(repoContents);
        // Loop through it like a tree
        // If it's a folder, instantiate the folder then get all the files within it - want a 'traverse folder' function
        // If it's a file, instantiate the file and move onto the next sibling in the tree
    }

    buildTree2 (entries) {
        for (const entry of entries) {
            const { name, type, url } = entry;

            if (type === 'dir' && entry.children) {
               
            }

            tree.push(fileSystemEntry);
        }

        return tree;
    }

    async buildTree (entries) {
        for (const entry of entries) {
            const { name, type, url } = entry;
            if (type === 'file') {
                const fullPath = this.pathPointer + name;
                console.log(this.id);
                const newFile = new RepoFile({
                    name: name,
                    repoId: this.user,
                    url,
                    fullPath,
                });
                await newFile.initFileContent();
                this.files.push(newFile);
            }

            if (type === 'dir') {
                this.pathPointer = this.pathPointer + name + '/';
                const newDirectory = new RepoDirectory({
                    name,
                    repoId: this.user,
                    url,
                    fullPath: this.pathPointer
                });
            }
        }

        return this.files;
    }
}