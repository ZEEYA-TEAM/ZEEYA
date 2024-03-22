const axios = require("axios");

require("dotenv").config();

const NOTION_API_BASE_URL = process.env.NOTION_API_BASE_URL;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const EMAIL_PASSWORD_DATABASE_ID = "b4e9a79327eb43e59e1a46d2a75b0461"; // Database ID

exports.fetchEmailAndPassword = async () => {
  try {
    const response = await axios.post(
      `${NOTION_API_BASE_URL}/databases/${EMAIL_PASSWORD_DATABASE_ID}/query`,
      {},
      {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );
    return response.data.results; // Fetch all records
  } catch (error) {
    console.error("Error fetching data from database:", error);
    throw new Error("Failed to fetch data.");
  }
};

exports.validateUserByEmailAndPassword = async (email, password) => {
  const data = await this.fetchEmailAndPassword();
  return data.some((entry) => {
    const entryEmail = entry.properties.email.email;
    const entryPassword = entry.properties.password.rich_text[0]?.plain_text;
    return entryEmail === email && entryPassword === password;
  });
};
