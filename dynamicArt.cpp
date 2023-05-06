#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <algorithm>

#include "httplib.h"
#include "dynamicArtDB.h"
#include "dynamicArtInfo.h"

using namespace httplib;
using namespace std;

const int port = 5005;

dynamicArtDB obj; // Create a global instance of the dynamicArtDB class

int main() {
    httplib::Server svr;

    svr.Get(R"/dynamicArt/getEmotionPercentages/(.*))", [&](const Request& req, Response& res) {
        res.set_header("Access-Control-Allow-Origin","*");
        string username = req.matches[1];
        dynamicArtDB dDB;
          string result;
        vector<int> value;
        
    });

    svr.listen("localhost", 8080);

    return 0;
}
