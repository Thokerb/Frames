CC=clang
CXX=clang++

# Compiler flags
CFLAGS= -c -O0
LDFLAGS= -shared -o dhrystone.dll  # Create a shared library (DLL)

# Source files
DHRYSTONE=dhry_1.c

# Object files
DHRYSTONE_OBJECTS=$(DHRYSTONE:.c=.o)

# Default target
all: dhrystone

# Create the DLL
dhrystone: $(DHRYSTONE_OBJECTS)
	$(CC) $(DHRYSTONE_OBJECTS) $(LDFLAGS)

# Clean up object files
clean:
	del *.o
	del dhrystone.dll
