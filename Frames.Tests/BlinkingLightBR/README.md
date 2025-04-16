Here the idea is a Blinking Light Battle Royal.

This means that we have the following Structure

Arena
- Arena
  - BlinkingLight
  - BlinkingLight
- BlinkingLight

BlinkingLight turns on x times.
When it turns off for the last time, it sends a finished message to the arena and to its opponent.
When blinking light receives a finished message, it doesnt compete anymore.
The blinking light that turns off first wins.

BlinkingLight has 4 states:
- On
- Off
- FinishedByItself
- FinishedByOpponent
