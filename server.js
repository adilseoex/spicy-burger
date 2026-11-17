const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.sbcms': 'application/octet-stream'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    let decodedPath = decodeURIComponent(reqUrl);

    // Explicit 404 route handling
    if (decodedPath === '/404' || decodedPath === '/404.html') {
        const notFoundPath = path.join(PUBLIC_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            fs.createReadStream(notFoundPath).pipe(res);
            return;
        }
    }

    // Resolve file candidate paths
    let candidatePaths = [];

    if (decodedPath === '/' || decodedPath === '') {
        candidatePaths.push(path.join(PUBLIC_DIR, 'index.html'));
    } else {
        let clean = decodedPath.replace(/^\/+/, '');
        // 1. Direct file match
        candidatePaths.push(path.join(PUBLIC_DIR, clean));
        // 2. .html appended match (clean URLs)
        candidatePaths.push(path.join(PUBLIC_DIR, clean + '.html'));
        // 3. Directory index match
        candidatePaths.push(path.join(PUBLIC_DIR, clean, 'index.html'));
    }

    let filePath = candidatePaths.find(p => fs.existsSync(p) && fs.statSync(p).isFile());

    if (filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Check range request
        let rangeMatch = req.url.match(/range=(\d+)-(\d+)/);
        if (!rangeMatch && req.headers.range) {
            rangeMatch = req.headers.range.match(/bytes=(\d+)-(\d+)/);
        }

        if (rangeMatch) {
            const start = parseInt(rangeMatch[1], 10);
            const end = parseInt(rangeMatch[2], 10);
            const fileData = fs.readFileSync(filePath);
            const total = fileData.length;
            const sliceEnd = Math.min(end, total - 1);
            const chunk = fileData.subarray(start, sliceEnd + 1);

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Range': `bytes ${start}-${sliceEnd}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunk.length
            });
            res.end(chunk);
            return;
        }

        // Cache headers for static assets
        const isAsset = filePath.includes(path.sep + 'assets' + path.sep);
        const headers = {
            'Content-Type': contentType,
            'Cache-Control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache'
        };

        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(res);
    } else {
        // 404 fallback
        const notFoundPath = path.join(PUBLIC_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            fs.createReadStream(notFoundPath).pipe(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
});

server.listen(PORT, () => {
    console.log(`🍔 Spicy Burger server running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop.`);
});
