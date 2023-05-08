# Gallery Art Project
# Connor Dailey, Kenyon College 2023

CC = g++

# For Optimization
# CFLAGS = -O2
# For debugging
CFLAGS = -std=c++14 -Wno-deprecated-declarations

all: testcontact contactApp PutHTML 



dynamicArtDB.o: dynamicArtDB.cpp dynamicArtDB.h
        $(CC) -c $(CFLAGS) -I/usr/include/cppconn dynamicArtDB.cpp



dynamicArtInfo.o: dynamicArtInfo.cpp dynamicArtInfo.h httplib.h
        $(CC) -c $(CFLAGS) contactApp.cpp

dynamicArt: dynamicArtInfo.o dynamicArtDB.o 
        $(CC) dynamicArtInfo.o dynamicArtDB.o  -o dynamicArt -L/usr/local/lib -lmariadbcpp

PutHTML:
	
	cp dynamicArt.html /var/www/html/art/
	cp dynamicArt.js /var/www/html/art/
	
	@echo "Current contents of your HTML directory: "
	@ls -l /var/www/html/art

clean:
	$(RM) $(_OBJDIR)/*.o art

