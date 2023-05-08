#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <algorithm>
#include <nlohmann/json.hpp>


#include "httplib.h"
#include "dynamicArtDB.h"
#include "dynamicArtInfo.h"


using namespace httplib;
using namespace std;
using json = nlohmann::json;

const int port = 5005;

dynamicArtDB obj; // Create a global instance of the dynamicArtDB class

int main() {
    httplib::Server svr;

    svr.Get(R"(/dynamicArt/getEmotionPercentages/)", [&](const Request& req, Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
          json result;

 
        result = obj.getEmotionCount();

  
   res.set_content(result.dump(), "application/json");
    });

    svr.listen("0.0.0.0", port);
    return 0;
}
