const axios = require("axios");
require("dotenv").config();

const NOTION_API_BASE_URL = process.env.NOTION_API_BASE_URL;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID_2; // Database ID

/**
 * Fetch all data from the Notion database.
 */
const fetchAllDataFromDatabase = async () => {
  try {
    const response = await axios.post(
      `${NOTION_API_BASE_URL}/databases/${DATABASE_ID}/query`,
      {}, // Empty query to fetch all records
      {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );

    return response.data.results; // Return all records
  } catch (error) {
    console.error("Error fetching data from database:", error);
    throw new Error("Failed to fetch data from database.");
  }
};

/**
 * Search for a person by name after fetching all the data.
 */
const findPersonByNameAfterFetch = async (name) => {
  try {
    // Fetch all data from the database
    const allData = await fetchAllDataFromDatabase();

    // Filter the data based on the provided name
    const userExists = allData.some((item) => {
      // Check if the item contains any text that matches the provided name
      // Assuming the name is stored in any text-based property
      for (const prop in item.properties) {
        if (
          item.properties[prop].type === "title" && // Assuming the property type is "title"
          item.properties[prop]?.title[0]?.text?.content?.toLowerCase() ===
            name.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });

    // If the user exists, return true; otherwise, return false
    return userExists;
  } catch (error) {
    console.error("Error in finding person by name:", error);
    throw error;
  }
};

module.exports = { findPersonByNameAfterFetch };
