CXX = clang++

CXXFLAGS = -c -O0 -fPIC -fdeclspec
LDFLAGS = -shared -o dhrystone.so

# Source files
DHRYSTONE = dhry_1.cpp
DHRYSTONE_OBJECTS = $(DHRYSTONE:.cpp=.o)

all: dhrystone.so

dhrystone.so: $(DHRYSTONE_OBJECTS)
	$(CXX) $(DHRYSTONE_OBJECTS) $(LDFLAGS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) $< -o $@

clean:
	rm -f *.o
	rm -f dhrystone.so
