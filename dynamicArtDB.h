#include <stdlib.h>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>
#include <mariadb/conncpp.hpp>
#include "dynamicArtInfo.h"

#ifndef DYNAMICARTDB_H
#define DYNAMICARTDB_H

class dynamicArtDB {
public:
    dynamicArtDB();
    std::map<std::string, int> getEmotionCount();
private:
    const string db_url = "jdbc:mariadb://localhost:3306/GalleryArtProject";
    const string user = "root";
    const string pass = "newpassword";
    sql::Driver* driver;
    sql::Properties properties;
    std::unique_ptr<sql::Connection> conn;
};

#endif /* DYNAMICARTDB_H */

