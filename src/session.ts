/* Made by the cracklR Group in '24!
Session objects help keep track of an ongoing game between two players.
It expires after 1 hour, when it expires, the game will end on it's own, no EXP is awarded to either player.
*/

type onEndListener = (sessionObj: session) => void;

export default class session {
  sessionEnd: NodeJS.Timeout;

  // These are to properly trigger an onEnd listener by setting booleans.
  private _ended: boolean = false;
  onEnd: onEndListener;

  // Discord IDs to indicate users partaking in the game.
  guesser: string;
  host: string;

  // Variables to keep track of game progress
  gameWin: boolean = false; //Change this to indicate a win and award EXP later down the road
  private _hintCount: number = 3;

  constructor(guesser: string, host: string, onEnd: onEndListener) {
    this.guesser = guesser;
    this.host = host;
    // End the session after 1 hour:
    this.sessionEnd = setTimeout(() => (this.ended = true), 1000 * 60 * 60);
    this.onEnd = onEnd;
  }

  get ended() {
    return this._ended;
  }

  set ended(val: boolean) {
    this._ended = val;

    // When the session ends, perform further actions based on what was previously defined:
    if (val) this.onEnd(this);
  }

  // Obfuscate hint count so that we can restore proper numbers if they go higher or lower
  get hints() {
    return this._hintCount;
  }

  set hints(val: number) {
    this._hintCount = val;

    if (this._hintCount < 0) this._hintCount = 0;
    if (this._hintCount > 3) this._hintCount = 3;
  }
}
