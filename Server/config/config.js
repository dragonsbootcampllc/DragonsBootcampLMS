require('dotenv').config();

// Function to parse DATABASE_URL
const parseDatabaseUrl = (url) => {
  const regex = /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const matches = url.match(regex);

  if (matches) {
    return {
      username: matches[1],
      password: matches[2],
      host: matches[3],
      port: parseInt(matches[4], 10),
      database: matches[5]
    };
  } else {
    throw new Error('Invalid DATABASE_URL format');
  }
};

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
};

module.exports = {
  development: {
    ...config,
    logging: false,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  },
  test: {
    ...config,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  },
  production: {
    ...config,
    define: {
      createdAt: "createdat",
      updatedAt: "updatedat"
    },
    dialect: 'postgres',
  }
};
