const getNote = (string) => {
  const notes = {
    C: 16.35,
    'C#': 17.32,
    'CS': 17.32,
    Db: 17.32,
    D: 18.35,
    'D#': 19.45,
    'DS': 19.45,
    Eb: 19.45,
    E: 20.60,
    F: 21.83,
    'F#': 23.12,
    'FS': 23.12,
    Gb: 23.12,
    G: 24.5,
    'G#': 25.96,
    'GS': 25.96,
    Ab: 25.96,
    A: 27.50,
    'A#': 29.14,
    'AS': 29.14,
    Bb: 29.14,
    B: 30.87,
  };

  const [noteName, noteOctaveString] = string.split(/(\d+)/);

  const noteOctave = Number(noteOctaveString);

  console.log(noteName, noteOctave);

  return notes[noteName] * (2 ** noteOctave);
};

const createOscillator = () => {
  const context = new AudioContext();

  const oscillator = context.createOscillator();

  oscillator.connect(context.destination);
  oscillator.type = 'sine';

  return oscillator;
};

const playSong = async (song, durations) => {
  let i = 1;

  const oscillator1 = createOscillator();
  const oscillator2 = createOscillator();

  oscillator1.start();
  oscillator2.start();

  oscillator1.frequency.value = 0;
  oscillator2.frequency.value = 0;

  for (let i = 0; i < song.length; i++) {
    const note = song[i];
    const duration = durations[i];
    if (i % 2 === 0) {
      oscillator1.frequency.value = getNote(note);
    } else {
      oscillator2.frequency.value = getNote(note);
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        oscillator1.frequency.value = 0;
        oscillator2.frequency.value = 0;
        resolve();
      }, duration);
    });
  }
  oscillator1.frequency.value = 0;
  oscillator2.frequency.value = 0;
};

class Song {
  constructor(notes, durations, sixteenth) {
    this.notes = notes;
    this.durations = durations.map((duration) => duration * sixteenth);
    this.sixteenth = sixteenth;
  }

  play() {
    playSong(this.notes, this.durations);
  }
}

class Song2 {
  constructor(notes, sixteenth) {
    this.notes = notes;
    this.sixteenth = sixteenth;
  }

  play() {
    playSong(this.notes.map((note) => note.note), this.notes.map((note) => note.duration * this.sixteenth));
  }
}

const getSixteenthTime = (compass) => {
  return 15000 / compass;
};
