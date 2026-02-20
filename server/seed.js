// Database Seed Script
// Populates the database with sample game data for testing and demonstration

import mongoose from 'mongoose';
import config from './config/config.js';
import Game from './models/game.model.js';

const sampleGames = [
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    genre: 'Action-Adventure',
    platform: 'Nintendo Switch',
    releaseYear: 2023,
    developer: 'Nintendo',
    rating: 9.5,
    description: 'An epic adventure across the land and skies of Hyrule awaits in this sequel to The Legend of Zelda: Breath of the Wild.',
  },
  {
    title: 'Elden Ring',
    genre: 'Action RPG',
    platform: 'PC, PlayStation, Xbox',
    releaseYear: 2022,
    developer: 'FromSoftware',
    rating: 9.3,
    description: 'A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.',
  },
  {
    title: 'God of War Ragnarök',
    genre: 'Action-Adventure',
    platform: 'PlayStation 4, PlayStation 5',
    releaseYear: 2022,
    developer: 'Santa Monica Studio',
    rating: 9.2,
    description: 'Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle.',
  },
  {
    title: 'Cyberpunk 2077',
    genre: 'Action RPG',
    platform: 'PC, PlayStation, Xbox',
    releaseYear: 2020,
    developer: 'CD Projekt Red',
    rating: 8.5,
    description: 'An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification.',
  },
  {
    title: 'Hades',
    genre: 'Roguelike',
    platform: 'PC, Nintendo Switch, PlayStation, Xbox',
    releaseYear: 2020,
    developer: 'Supergiant Games',
    rating: 9.0,
    description: 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.',
  },
  {
    title: 'Red Dead Redemption 2',
    genre: 'Action-Adventure',
    platform: 'PC, PlayStation 4, Xbox One',
    releaseYear: 2018,
    developer: 'Rockstar Games',
    rating: 9.7,
    description: 'An epic tale of life in America at the dawn of the modern age, featuring a vast and atmospheric world.',
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    genre: 'Action RPG',
    platform: 'PC, PlayStation, Xbox, Nintendo Switch',
    releaseYear: 2015,
    developer: 'CD Projekt Red',
    rating: 9.5,
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
  },
  {
    title: 'Hollow Knight',
    genre: 'Metroidvania',
    platform: 'PC, Nintendo Switch, PlayStation 4, Xbox One',
    releaseYear: 2017,
    developer: 'Team Cherry',
    rating: 9.0,
    description: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.',
  },
  {
    title: 'Stardew Valley',
    genre: 'Simulation',
    platform: 'PC, Nintendo Switch, PlayStation, Xbox, Mobile',
    releaseYear: 2016,
    developer: 'ConcernedApe',
    rating: 9.0,
    description: 'You\'ve inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools, you set out to begin your new life.',
  },
  {
    title: 'Baldur\'s Gate 3',
    genre: 'RPG',
    platform: 'PC, PlayStation 5, Xbox Series X/S',
    releaseYear: 2023,
    developer: 'Larian Studios',
    rating: 9.6,
    description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival.',
  },
  {
    title: 'Minecraft',
    genre: 'Sandbox',
    platform: 'PC, Console, Mobile',
    releaseYear: 2011,
    developer: 'Mojang Studios',
    rating: 9.0,
    description: 'A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things.',
  },
  {
    title: 'Dark Souls III',
    genre: 'Action RPG',
    platform: 'PC, PlayStation 4, Xbox One',
    releaseYear: 2016,
    developer: 'FromSoftware',
    rating: 8.9,
    description: 'As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments.',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.db);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing games
    await Game.deleteMany({});
    console.log('Cleared existing games.');

    // Insert sample games
    const insertedGames = await Game.insertMany(sampleGames);
    console.log(`Successfully seeded ${insertedGames.length} games.`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
