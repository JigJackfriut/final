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

// Calculates percentage of emotions 
void dynamicArtDB::getEmotionCount(std::string emotion) {
    if (!conn) {
        cerr << "Invalid database connection" << endl;
        exit(EXIT_FAILURE);
    }

    unique_ptr<sql::Statement> stmnt(conn->createStatement());
    unique_ptr<sql::ResultSet> resTotal(stmnt->executeQuery("SELECT COUNT(*) as total FROM responses"));
    int totalResponses = 0;
    if (resTotal->next()) {
        totalResponses = resTotal->getInt("total");
    }

    map<string, int> emotionCounts;
    unique_ptr<sql::ResultSet> resEmotions(stmnt->executeQuery("SELECT emotion, COUNT(*) as count FROM responses GROUP BY emotion"));

    while (resEmotions->next()) {
        string currentEmotion = resEmotions->getString("emotion");
        int count = resEmotions->getInt("count");
        emotionCounts[currentEmotion] = count;
    }

    map<string, double> emotionPercentages;
    for (const auto &entry : emotionCounts) {
        emotionPercentages[entry.first] = static_cast<double>(entry.second) / totalResponses * 100;
    }

    // emotionPercentages now contains the percentage of responses for each emotion
    // You can return it or use it as needed for the word cloud
  return emotionPercentages;
      
}

