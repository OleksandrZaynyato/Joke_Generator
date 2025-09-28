import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const swaggerDocsDir = path.join(process.cwd(), 'server/swagger/docs');

function getAllYamlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllYamlFiles(filePath));
        } else if (file.endsWith('.yaml') || file.endsWith('.yml')) {
            results.push(filePath);
        }
    });
    return results;
}

// тут будемо зберігати всі об’єднані paths
const allPaths = {};

getAllYamlFiles(swaggerDocsDir).forEach(file => {
    const doc = yaml.load(fs.readFileSync(file, 'utf8'));
    if (doc.paths) {
        Object.entries(doc.paths).forEach(([key, value]) => {
            allPaths[key] = value; // додаємо кожен endpoint
        });
    }
});

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    paths: allPaths, // тепер тут всі ендпоінти з усіх yaml-файлів
};

export { swaggerUi, swaggerDocument };
