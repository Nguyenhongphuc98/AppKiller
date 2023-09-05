const { execFile } = require('child_process');
const { windowManager } = require("node-window-manager-all");
const ConsoleWindow = require("node-hide-console-window");

ConsoleWindow.hideConsole();

// lience
const now = Date.now();
if (now > 1694014855786) {
    // Wed Sep 06 2023 22:40:55
    return;
}

const GAME_FAKE_NAME = 'client.exe';
const MAX_GAME = 3;

// setInterval(() => {

// }, 100000);


function openGame(_params) {
    const params = _params || process.argv.slice(1);
    console.log('======> params', params);

    execFile(GAME_FAKE_NAME, params, (error, stdout, stderr) => {
        console.log('============== exec', error)
        
        if (error) {
            console.error('Error:', error);
            return;
        }
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);
    });
}

windowManager.on('window-activated', e => {
    console.log("=== active === ", e);

    if (e.path.includes(GAME_FAKE_NAME)) {
        const windows = windowManager.getWindows();
        const ourGames = windows.filter(w => {
            return w.path.includes(GAME_FAKE_NAME);
        });

        if (ourGames.length > MAX_GAME) {
            console.log('kill: ', ourGames, ourGames[0].path);
            process.kill(ourGames[0].processId);
        }
    }
});

const windows = windowManager.getWindows();


const ourGames = windows.filter(w => {
    return w.path.includes(GAME_FAKE_NAME);
});

if (ourGames.length < MAX_GAME) {
    openGame();
}

const ourApps = windows.filter(w => {
    return w.path.includes('game.exe');
});

if (ourApps.length > 1) {
    setTimeout(() => {
        process.exit();
    }, 1000);
}

