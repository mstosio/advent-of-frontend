
import * as path from 'path';
import * as childProcess from 'child_process';
import {fileURLToPath} from 'url'
import 'ts-node/register';

// Get the argument passed to the script (e.g., 2023-12-12)
const taskDate = process.argv[2];

const __filename = fileURLToPath(import.meta.url);

const taskFilePath = path.join(path.dirname(__filename), `../tasks/${taskDate}/index.ts`);

try {
    childProcess.execSync(`npx tsx ${taskFilePath}`, { stdio: 'inherit' });
} catch (error) {
    console.error(error.message);
    process.exit(1);
}