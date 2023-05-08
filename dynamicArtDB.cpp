#include <vector>
#include <iostream>
#include <mariadb/conncpp.hpp>
#include "dynamicArtDB.h"
#include "dynamicArtInfo.h"


dynamicArtDB::dynamicArtDB() {
        // Instantiate Driver
        driver = sql::mariadb::get_driver_instance();

        // Configure Connection
        // The URL or TCP connection string format is
        // ``jdbc:mariadb://host:port/database``.
        sql::SQLString url(db_url);

    // Use a properties map for the other connection options
        sql::Properties my_properties({{"user", user}, {"password",pass}});
        // Save properties in object
        properties = my_properties;

    // Establish Connection
        unique_ptr<sql::Connection> my_conn(driver->connect(db_url, properties));
    
    // Check success
    if (!my_conn) {
                cerr << "Invalid database connection" << endl;
                exit (EXIT_FAILURE);
        }

        // Save connection in object
        conn = std::move(my_conn);

}

map<string, int> dynamicArtDB::getEmotionCount() {
    std::map<std::string, int> emotionCounts;

// List of emotions to count
std::vector<std::string> emotions = {"Happiness", "Fear", "Sadness", "Anger"};

// Iterate over the list of emotions and count each one
for (const auto& emotion : emotions) {
    std::string query = "SELECT COUNT(*) AS count FROM my_table WHERE emotions = ?";
    sql::PreparedStatement *stmt = conn->prepareStatement(query);
    stmt->setString(1, emotion);
    sql::ResultSet *res = stmt->executeQuery();
    if (res->next()) {
        int count = res->getInt("count");
        emotionCounts[emotion] = count;
    }
}
  return emotionCounts;
}
