import { readFileSync } from 'node:fs';
import path from 'node:path';

const getFileByPath = (pathToFile) => JSON.parse(readFileSync(path.resolve(pathToFile)));

export default getFileByPath;
