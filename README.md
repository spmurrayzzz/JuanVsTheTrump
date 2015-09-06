# Juan vs. The Trump

Desktop entry for the [js13kgames](http://js13kgames.com) 2015 competition.

Our hero is Juan. His desires in life are simple: collect coins and stay alive.
His lifelong rival is the Trump, who just likes to screw everything up.

Help Juan navigate the floating platforms to collect coins. But be careful: some
platforms have deadly spikes and the Trump shows up every so often to scare you
and reverse the direction of the platforms.

**Controls**: Left/Right arrows to move, Spacebar to jump

## Development

Getting started:
```bash
sudo npm install -g grunt-cli
npm install
```

To kick off a build:
```bash
grunt
```

To build whenever you save a `src` file:
```bash
grunt watch
```

To serve the app:
```bash
grunt express:dev
```

Load [http://localhost:8675/dist/](http://localhost:8675/dist/) in your browser.

## Packaging

After each build, you'll find `compressed/index.html` and
`compressed/index.html.zip`. The zip file is the artifact used for submission.

## Credits

- Game art for Juan and coins provided by: [http://opengameart.org/content/platform-game-sprites](http://opengameart.org/content/platform-game-sprites)
- Development template: [js13k-requirejs](https://github.com/spmurrayzzz/js13k-requirejs)
- SFX: [jsfxr](https://github.com/mneubrand/jsfxr) — Patched by [Kevin Ennis](https://github.com/kevincennis)
